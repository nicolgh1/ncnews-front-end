const { mostPopular, topThreePerTopic } = require("../src/utils/utils");

describe("mostPopular", () => {
  test("Returns an object", () => {
    expect(mostPopular([])).toEqual({});
  });
  test("Returns the object with the highest votes", () => {
    const articles = [
      {
        article_id: 34,
        title: "The Notorious MSG’s Unlikely Formula For Success",
        topic: "cooking",
        author: "grumpy19",
        created_at: "2020-11-22T11:13:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?w=700&h=700",
        comment_count: 11,
      },
      {
        article_id: 12,
        title: "The battle for Node.js security has only begun",
        topic: "coding",
        author: "tickle122",
        created_at: "2020-11-15T13:25:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/10845119/pexels-photo-10845119.jpeg?w=700&h=700",
        comment_count: 7,
      },
      {
        article_id: 6,
        title:
          "JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals",
        topic: "coding",
        author: "grumpy19",
        created_at: "2020-11-11T15:09:00.000Z",
        votes: 20,
        article_img_url:
          "https://images.pexels.com/photos/4383298/pexels-photo-4383298.jpeg?w=700&h=700",
        comment_count: 11,
      },
      {
        article_id: 1,
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        created_at: "2020-11-07T06:03:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
        comment_count: 8,
      },
      {
        article_id: 21,
        title: "Agility Training Drills For Football Players",
        topic: "football",
        author: "tickle122",
        created_at: "2020-10-26T10:05:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/3448250/pexels-photo-3448250.jpeg?w=700&h=700",
        comment_count: 8,
      },
      {
        article_id: 7,
        title: "Using React Native: One Year Later",
        topic: "coding",
        author: "tickle122",
        created_at: "2020-10-18T01:26:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/6424586/pexels-photo-6424586.jpeg?w=700&h=700",
        comment_count: 8,
      },
    ];
    expect(mostPopular(articles)).toEqual({
      article_id: 6,
      title:
        "JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals",
      topic: "coding",
      author: "grumpy19",
      created_at: "2020-11-11T15:09:00.000Z",
      votes: 20,
      article_img_url:
        "https://images.pexels.com/photos/4383298/pexels-photo-4383298.jpeg?w=700&h=700",
      comment_count: 11,
    });
  });
});


