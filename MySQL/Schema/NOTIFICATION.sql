-- NOTIFICATION table stores alerts for users when something happens
-- like a like, comment, share, or group-related action.
-- TriggerUserID is the user who caused the notification.
-- Author: Sophia Priola

CREATE TABLE NOTIFICATION (
    NotificationID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    RecipientUserID INT UNSIGNED NOT NULL,
    TriggerUserID INT UNSIGNED NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Message TEXT NOT NULL,
    IsRead BOOLEAN NOT NULL DEFAULT FALSE,
    RelatedPostID INT UNSIGNED DEFAULT NULL,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_notification
        PRIMARY KEY (NotificationID),

    CONSTRAINT fk_notification_recipient
        FOREIGN KEY (RecipientUserID)
        REFERENCES USERS(USER_ID)
        ON DELETE CASCADE,

    CONSTRAINT fk_notification_trigger
        FOREIGN KEY (TriggerUserID)
        REFERENCES USERS(USER_ID)
        ON DELETE CASCADE,

    CONSTRAINT fk_notification_post
        FOREIGN KEY (RelatedPostID)
        REFERENCES POSTS(POST_ID)
        ON DELETE CASCADE
);