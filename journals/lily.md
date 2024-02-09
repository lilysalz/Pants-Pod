## February 7th, 2024
Last night I met with the clients to show them how the web app looks now. They loved it but requested a few styling changes so I spent the morning finishing up those changes. I then went through the web app and tried to find as many bugs as possible. I found a few to solve. First, I worked on the issue of if users are on their liked episodes page and logout, we stay on that page and get an error so I changed it so that users are redirected to the home page when they log out. I spent the rest of the day fixing a few other bugs and adding a nav bar. We finished our MVP so I will spend the next few days working on stretch features. 

## February 6th, 2024
Noah worked on the bug so I worked on the README. I met with the producer to talk about target demos and stretch goals. I then wrote out our web app's functionality, who it's for, our stretch goals, our API documentation, our testing and edited some other sections. When I finished the README, I made an 'About Us' page. It's ugly. I'm going to think about ways to fix it for tomorrow.

## February 5th, 2024
Today, we worked on making the page for the liked episodes. Logically, we basically just copied over the episodes page and swapped out the query for a useGetLikedEpisodes query. The tricky part is the page doesn't automatically update. This means that when someone unlikes an episode, they should be deleting a liked episode and thus removing it from the page but sometimes the episode stays on the page. We will work on this tomorrow. 

## February 1st, 2024
Today, I worked on the like function for the episodes page. Noah made a cool animation: when a user likes an episode, they click on cute pants and it turns into a heart. We made the logic so that when a user clicks on the pants, they 'create' a liked episode with all of the corresponding episode's information.

## January 31st, 2024

Today, I formatted the home page, nav bar, sign up, and log in pages. My favorite part is at the bottom of the home page, I added a card that has all the information for the most recent episode. A user is able to see the title, description, go to the spotify page for the ep, and go to the apple page. I set this up with a lazy query to get all episodes and then I grabbed all the information from the last input.

## January 30th, 2024

Today, I made the episodes list page. I added a feature to sort the episodes. The episodes are listed out with headers for title, release date, duration, a spotify url, apple url, and a like button. Originally, I was making a sort function that wa set up so when users clicked on a header it would sort by that header. In the end it was a bit inconsistent and overkill - the clients said they only want the users to be able to sort by date - so I started over. I realized that we get our data from spotify and apple by date so our episodes are already in decreasing order (most recent ep on top and first ep on bottom). All I would have to do is reverse the list of inputs when a 'sort by date' button is clicked. From there, it was easy.

## January 29, 2024

Today, I finally got the unit test on the get method for liked episodes to run! It passes if we are able to get a users liked episodes with no errors. It has a fake database of liked episodes for a user and passes when the status code is 200, the length of the response is equivalent to the amount of liked episodes in our mock database, and the liked episodes match that database exactly. 

My test originally was having trouble accessing other files because there was no init method in the tests folder. Once I added a __init__.py file, everything worked.

## January 25, 2024

Today, was another short day but I started writing a unit test.

## January 24, 2024

Today, was a short day so we spent the day researching. I read about unit tests. P.S. the WHERE NOT EXISTS worked!

## January 23, 2024

Today, we created all the API endpoints for comments and tell_us_anything submissions. Once we did that, I tried to test everything in swagger in order to come up with necessary error handling. I realized that right now, we are able to create the same liked episode multiple times meaning a user can like an episode multiple times and their list of liked episodes can have the same episode over and over again. In researching how to fix that, I saw that some people have used a WHERE NOT EXISTS for postgresSQL. This seems like it should work and in theory I'll be able to have something like:
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

## January 22, 2024

Today, we created the API endpoints for getting, creating, and deleting liked episodes.
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

Today, we finished backend auth! Finally! We all organized our code in pretty different ways. For example, I created a models.py file to keep all my models like the AccountForm and AccountToken classes (described in the JWTdown documentation) while Omari put them in the router file that was calling them. Since my computer was running slowly and Noah got all of his code to work, once I felt like I understood how to set up our backend auth, I decided to just adapt his code. Today has been a good exercise in understand how other people code opposed to just figuring out how I would get the 'right answer'.

## January 18, 2024

Today, the team worked on backend authentication. None of us had done it before, so we all wanted to try to set it up individually. This took a while but figured it was better for our learning experience. No one of us got ours to work yet so hopefully we will finish tomorrow. It took me so long to make any progress because I kept having to rebuild my docker images and my computer wouldn't function for a while after doing so. I've learned that I will need to get more memory on my computer in order to work efficiently on this project.

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
