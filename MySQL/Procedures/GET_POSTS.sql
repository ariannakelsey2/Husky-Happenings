DELIMITER $$

CREATE PROCEDURE GET_POSTS(IN current_user_id INT UNSIGNED)
BEGIN
    SELECT
        p.POST_ID,
        p.AUTHOR_ID,
        u.USERNAME AS AUTHOR,
        p.CONTENT,
        p.CREATED_AT,
        p.SHARED_POST_ID,
        p.GroupID,
        hg.GroupName,
        original.CONTENT AS ORIGINAL_CONTENT,
        original_user.USERNAME AS ORIGINAL_AUTHOR,
        COUNT(l.POST_ID) AS LIKE_COUNT
    FROM POSTS p
    JOIN USERS u
        ON p.AUTHOR_ID = u.USER_ID
    LEFT JOIN HGroup hg
        ON p.GroupID = hg.GroupID
    LEFT JOIN POSTS original
        ON p.SHARED_POST_ID = original.POST_ID
    LEFT JOIN USERS original_user
        ON original.AUTHOR_ID = original_user.USER_ID
    LEFT JOIN LIKES l
        ON p.POST_ID = l.POST_ID
    WHERE
        p.AUTHOR_ID = current_user_id
        OR EXISTS (
            SELECT 1
            FROM GroupMember gm
            WHERE gm.GroupID = p.GroupID
              AND gm.UserID = current_user_id
              AND gm.MembershipStatus = 'Accepted'
        )
    GROUP BY
        p.POST_ID,
        p.AUTHOR_ID,
        u.USERNAME,
        p.CONTENT,
        p.CREATED_AT,
        p.SHARED_POST_ID,
        p.GroupID,
        hg.GroupName,
        original.CONTENT,
        original_user.USERNAME
    ORDER BY p.CREATED_AT DESC;
END$$

DELIMITER ;