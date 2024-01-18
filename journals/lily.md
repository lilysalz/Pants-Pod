## January 17, 2024

Today I worked on:

-   Restructuring the data and the API endpoints.

Today, we realized that in order to practice normalization, we could structure our data better. We went back and forth on a few ideas - the two best ones being:

1.  We have a table for episodes, one for users, and one for user's episodes and comments. The user's episode and comments table would have a user ID (FK), comment ID (FK), Episode ID (FK), and liked status (bool). This idea, in theory, would work for what we want but combining user's comments and liked episodes would create a lot of undesired data to sort through.
2.  (The idea we went with) We have a table for episodes, one for users, one for comments, and one for liked episodes. Originally, we had this set up, but the liked episodes table and episodes table had too much overlap. This time around (for normalization) liked episodes just have a user ID, episode ID, and liked episode ID.


## January 16, 2024

Today I worked on:

-   Drawing out the data structure

-   Setting up the project

Today, the team created the project; set up the database; got our docker up and running; and started working on api endpoints.

We were originally getting an error because our PostgreSQL services section was below our fastapi services section in our docker-compose.yaml file. So, today, I learned that the order of the services in the yaml file is important.
