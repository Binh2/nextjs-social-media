BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(1000),
    [published] BIT NOT NULL CONSTRAINT [Post_published_df] DEFAULT 0,
    [authorId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Post_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Post_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Comment] (
    [id] NVARCHAR(1000) NOT NULL,
    [postId] NVARCHAR(1000) NOT NULL,
    [authorId] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(1000),
    [parentId] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Comment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [Comment_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Comment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reaction] (
    [postId] NVARCHAR(1000) NOT NULL,
    [authorEmail] NVARCHAR(1000) NOT NULL,
    [type] INT NOT NULL,
    CONSTRAINT [Reaction_pkey] PRIMARY KEY CLUSTERED ([postId],[authorEmail])
);

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [provider] NVARCHAR(1000) NOT NULL,
    [provider_account_id] NVARCHAR(1000) NOT NULL,
    [refresh_token] NVARCHAR(1000),
    [access_token] NVARCHAR(1000),
    [expires_at] INT,
    [token_type] NVARCHAR(1000),
    [scope] NVARCHAR(1000),
    [id_token] NVARCHAR(1000),
    [session_state] NVARCHAR(1000),
    [oauth_token_secret] NVARCHAR(1000),
    [oauth_token] NVARCHAR(1000),
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Account_provider_provider_account_id_key] UNIQUE NONCLUSTERED ([provider],[provider_account_id])
);

-- CreateTable
CREATE TABLE [dbo].[Session] (
    [id] NVARCHAR(1000) NOT NULL,
    [session_token] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [expires] DATE NOT NULL,
    CONSTRAINT [Session_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Session_session_token_key] UNIQUE NONCLUSTERED ([session_token])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [username] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [emailVerified] DATETIME2,
    [hashedPassword] NVARCHAR(1000),
    [image] NVARCHAR(1000),
    [isMale] BIT,
    [birthday] DATE,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[UserSchool] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(1000) NOT NULL,
    [roleId] NVARCHAR(1000),
    CONSTRAINT [UserSchool_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserSchool_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[UserSchoolRole] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserSchoolRole_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Friend] (
    [id] NVARCHAR(1000) NOT NULL,
    [user1Id] NVARCHAR(1000) NOT NULL,
    [user2Id] NVARCHAR(1000) NOT NULL,
    [type] INT NOT NULL,
    CONSTRAINT [Friend_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Friend_user1Id_key] UNIQUE NONCLUSTERED ([user1Id]),
    CONSTRAINT [Friend_user2Id_key] UNIQUE NONCLUSTERED ([user2Id]),
    CONSTRAINT [Friend_user1Id_user2Id_key] UNIQUE NONCLUSTERED ([user1Id],[user2Id])
);

-- CreateTable
CREATE TABLE [dbo].[VerificationToken] (
    [id] INT NOT NULL IDENTITY(1,1),
    [identifier] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [VerificationToken_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [VerificationToken_token_key] UNIQUE NONCLUSTERED ([token]),
    CONSTRAINT [VerificationToken_identifier_token_key] UNIQUE NONCLUSTERED ([identifier],[token])
);

-- CreateTable
CREATE TABLE [dbo].[_UserToUserSchool] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_UserToUserSchool_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_UserToUserSchool_B_index] ON [dbo].[_UserToUserSchool]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_postId_fkey] FOREIGN KEY ([postId]) REFERENCES [dbo].[Post]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[Comment]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reaction] ADD CONSTRAINT [Reaction_postId_fkey] FOREIGN KEY ([postId]) REFERENCES [dbo].[Post]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reaction] ADD CONSTRAINT [Reaction_authorEmail_fkey] FOREIGN KEY ([authorEmail]) REFERENCES [dbo].[User]([email]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Session] ADD CONSTRAINT [Session_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSchool] ADD CONSTRAINT [UserSchool_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[UserSchoolRole]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Friend] ADD CONSTRAINT [Friend_user1Id_fkey] FOREIGN KEY ([user1Id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Friend] ADD CONSTRAINT [Friend_user2Id_fkey] FOREIGN KEY ([user2Id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_UserToUserSchool] ADD CONSTRAINT [_UserToUserSchool_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_UserToUserSchool] ADD CONSTRAINT [_UserToUserSchool_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[UserSchool]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
