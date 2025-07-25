import { useState, useEffect } from "react";
import { Search } from "./another-todo/Search";
import { Stories } from "./another-todo/Stories";

import type { IStory } from "./another-todo/Story";

const initialStories: IStory[] = [
  {
    title: "React",
    url: "https://react.dev/",
    author: "Jordan Walke",
    numComments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    numComments: 2,
    points: 5,
    objectID: 1,
  },
];

function App() {
  const [stories, setStories] = useState<IStory[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveStory = (id: number) => {
    const newStories = stories.filter((story) => story.objectID !== id);

    setStories(newStories);
  };

  const searchedStories = stories.filter((story) =>
    story.title.includes(searchTerm)
  );

  const getStories = async (): Promise<{ data: { stories: IStory[] } }> =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 1000)
    );

  useEffect(() => {
    getStories()
      .then((res) => {
        setStories(res.data.stories);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error retrieving data: ", err);
      });
  }, []);

  return (
    <>
      <Search onChange={handleSearch} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Stories items={searchedStories} onRemoveStory={handleRemoveStory} />
      )}
    </>
  );
}

export default App;
