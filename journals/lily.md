## January 26, 2023

Today I finally got the unit test on the get method for liked episodes to run!

## January 25, 2023

Today was another short day but I started writing a unit test.

## January 24, 2023

Today was a short day so we spent the day researching. I read about unit tests. P.S. the WHERE NOT EXISTS worked!

## January 23, 2023

Today we created all the API endpoints for comments and tell_us_anything submissions. Once we did that, I tried to test everything in swagger in order to come up with necessary error handling. I realized that right now, we are able to create the same liked episode multiple times meaning a user can like an episode multiple times and their list of liked episodes can have the same episode over and over again. In researching how to fix that, I saw that some people have used a WHERE NOT EXISTS for postgresSQL. This seems like it should work and in theory I'll be able to have something like:
"""
INSERT INTO liked_episodes (
episode_id,
user_id
)
VALUES (%s, %s)
WHERE NOT EXISTS (episode_id = ..., user_id = ...)
RETURNING id;
""",
I'm excited to try this tomorrow!

## January 22, 2023

Today we created the API endpoints for getting, creating, and deleting liked episodes.
When creating the delete method, we kept getting a type error because we had our original delete function's try block like this:
try:
with pool.connection() as conn:
with conn.cursor() as db:
db.execute(
"""
DELETE FROM liked_episodes
WHERE episode_id = %s AND user_id = %s
""",
[[episode_id], [user_id]]
)
The problem here is SQL is expecting two separate values but we were only passing in one. The code worked when we removed the inner square brackets around episode_id and user_id.

## January 19, 2024

Today we finished backend auth! Finally! We all organized our code in pretty different ways. For example, I created a models.py file to keep all my models like the AccountForm and AccountToken classes (described in the JWTdown documentation) while Omari put them in the router file that was calling them. Since my computer was running slowly and Noah got all of his code to work, once I felt like I understood how to set up our backend auth, I decided to just adapt his code. Today has been a good exercise in understand how other people code opposed to just figuring out how I would get the 'right answer'.

## January 18, 2024

Today the team worked on backend authentication. None of us had done it before, so we all wanted to try to set it up individually. This took a while but figured it was better for our learning experience. No one of us got ours to work yet so hopefully we will finish tomorrow. It took me so long to make any progress because I kept having to rebuild my docker images and my computer wouldn't function for a while after doing so. I've learned that I will need to get more memory on my computer in order to work efficiently on this project.

## January 17, 2024

Today I worked on:

-   Restructuring the data and the API endpoints.

Today we realized that in order to practice normalization, we could structure our data better. We went back and forth on a few ideas - the two best ones being:

1.  We have a table for episodes, one for users, and one for user's episodes and comments. The user's episode and comments table would have a user ID (FK), comment ID (FK), Episode ID (FK), and liked status (bool). This idea, in theory, would work for what we want but combining user's comments and liked episodes would create a lot of undesired data to sort through.
2.  (The idea we went with) We have a table for episodes, one for users, one for comments, and one for liked episodes. Originally, we had this set up, but the liked episodes table and episodes table had too much overlap. This time around (for normalization) liked episodes just have a user ID, episode ID, and liked episode ID.

## January 16, 2024

Today I worked on:

-   Drawing out the data structure

-   Setting up the project

Today the team created the project; set up the database; got our docker up and running; and started working on api endpoints.

We were originally getting an error because our PostgreSQL services section was below our fastapi services section in our docker-compose.yaml file. So, today, I learned that the order of the services in the yaml file is important.
