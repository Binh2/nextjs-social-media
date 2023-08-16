context("/api/friends", () => {
  it("Create a friend request", () => {
    cy.request("POST", "/api/friends").then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.results).to.be.true;
    })
  })
  it("Get friend requests", () => {
    cy.request("GET", "/api/friends").then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.results).to.be.true;
    })
  })
})