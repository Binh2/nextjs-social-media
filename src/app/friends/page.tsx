"use client";
import Image from 'next/image';
import Header from "@/components/common/Header"
import { transformResponse } from "@/lib/axiosBigint";
import { User } from "@prisma/client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FriendTypes } from '@/lib/constants/friendTypes';
import { useState } from 'react';

export default function Page() {
  const {data: friendRequests} = useQuery<User[]>(["friends"], async () => 
    axios.get("/api/friends", {transformResponse, params: { type: FriendTypes.REQUEST}})
    .then(res => res.data))
  const {data: friendSuggestions} = useQuery<User[]>(["friends", "suggest", "school"], async () => {
    return axios.get("/api/friends/suggest/school", {transformResponse}).then(res => res.data)
  })

  return (<>
    <Header></Header>
    <h1>Friend requests</h1>
    {friendRequests?.map(friendRequest => <FriendRequest key={friendRequest.id} friend={friendRequest} />)}
    <h1>Friend suggestions</h1>
    {friendSuggestions?.map(friendSuggestion => <FriendSuggestion key={friendSuggestion.id} friend={friendSuggestion} />)}
  </>)
}
function FriendRequest({friend}: {friend: User}) {
  const userId = friend.id;
  const { data: mutualFriends } = useQuery<User[]>(["friends", "mutual", friend.id], async () =>
    await axios.get("/api/friends/mutual", { transformResponse, params: { userId, take: 2 }})
    .then(res => res.data))
  const { data: mutualFriendCount } = useQuery<number>(["friends", "mutual", "count"], async () => 
    await axios.get("/api/friends/mutual/count", {transformResponse, params: {userId}}).then(res => res.data)) 

  return (<div className={`rounded-lg`}>
    <Image src={friend.image || ''} alt='' width={0} height={0} style={{width: "auto", height: "auto"}} />
    <p className={`font-bold`}>{friend.name}</p>
    <div>
      <div>
        {mutualFriends?.map(mutualFriends => (
        <Image key={mutualFriends.id} src={mutualFriends.image || ''} alt="Mutual friends's profile pic" width={16} height={16}  />))}
      </div>
      <p>{mutualFriendCount} mutual friends</p>
    </div>
    <button className={`button button--standout`}>Confirm</button>
    <button className={`button`}>Delete</button>
  </div>)
}
function FriendSuggestion({friend}: {friend: User}) {
  const userId = friend.id;
  const [ isFriend, setIsFriend ] = useState(false);
  const [ isHidden, setIsHidden ] = useState(false);
  const addFriendMutation = useMutation({
    mutationFn: async () => fetch("/api/friends", {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: { "Content-Type": "application/json"}
    }).then(res => res.json()),
    onSuccess: () => {
      setIsFriend(true);
    }
  })
  const queryClient = new QueryClient();
  const removeFriendMutation = useMutation({
    mutationFn: async () => fetch("/api/friends", {
      method: "POST",
      body: JSON.stringify({ userId, type: FriendTypes.SUGGESTION_REMOVED }),
      headers: { "Content-Type": "application/json"}
    }).then(res => res.json()),
    onSuccess: () => {
      setIsHidden(true);
    }
  })

  const { data: mutualFriends } = useQuery<User[]>(["friends", "mutual", friend.id], async () =>
    await axios.get("/api/friends/mutual", { transformResponse, params: { userId, take: 2 }}).then(res => res.data))
  const { data: mutualFriendCount } = useQuery<number>(["friends", "mutual", "count"], async () => 
    await axios.get("/api/friends/mutual/count", {transformResponse, params: {userId}}).then(res => res.data)) 

  const loading = addFriendMutation.isLoading
  return (<>
    {!isHidden && <div className={`rounded-lg`}>
      <Image src={friend.image || ''} alt='' width={0} height={0} style={{width: "auto", height: "auto"}} />
      <p className={`font-bold`}>{friend.name}</p>
      <div>
        <div className={`h-4`}>
          {mutualFriends?.map(mutualFriends => (
            <Image key={mutualFriends.id} src={mutualFriends.image || ''} alt="Mutual friends's profile pic" width={16} height={16}  />))}
        </div>
        <p>{mutualFriendCount} mutual friends</p>
      </div>
      <button className={`button button--standout transition disabled:opacity-20`} disabled={loading || isFriend}
      onClick={() => addFriendMutation.mutate()}>{ isFriend ? "Friend added" : "Add friend" }</button>
      <button className={`button`} disabled={loading} 
      onClick={() => removeFriendMutation.mutate()}>Remove</button>
    </div>}
  </>)
}
