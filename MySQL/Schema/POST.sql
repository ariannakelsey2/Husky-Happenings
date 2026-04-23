USE HUSKYHAPPENINGS;

-- POSTS table stores all user posts that appear in the feed.
-- AUTHOR_ID shows who created the post.
-- SHARED_POST_ID is used when a post is a shared version of another post.
-- GroupID links each post to a specific group so only group members can see it.
-- Author: Sophia Priola

CREATE TABLE POSTS (
    POST_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    AUTHOR_ID INT UNSIGNED NOT NULL,
    CONTENT TEXT NOT NULL,
    CREATED_AT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    SHARED_POST_ID INT UNSIGNED DEFAULT NULL,
    GroupID INT UNSIGNED DEFAULT NULL,

    PRIMARY KEY (POST_ID),

    KEY FK_POST_AUTHOR (AUTHOR_ID),
    KEY fk_shared_post (SHARED_POST_ID),
    KEY fk_posts_group (GroupID),

    CONSTRAINT FK_POST_AUTHOR
        FOREIGN KEY (AUTHOR_ID)
        REFERENCES USERS(USER_ID)
        ON DELETE CASCADE,

    CONSTRAINT fk_shared_post
        FOREIGN KEY (SHARED_POST_ID)
        REFERENCES POSTS(POST_ID)
        ON DELETE SET NULL,

    CONSTRAINT fk_posts_group
        FOREIGN KEY (GroupID)
        REFERENCES HGroup(GroupID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);