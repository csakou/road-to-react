import { useState } from "react";
import { Slider } from "./sections/ImperativeReact/Slider";
import { Search } from "./another-todo/Search";
import { Stories } from "./another-todo/Stories";

import "./App.css";
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
  const [stories, setStories] = useState<IStory[]>(initialStories);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  return (
    <>
      <Slider
        initial={10}
        max={25}
        formatFn={(number) => number.toFixed(2)}
        onChange={(value: string | number) => console.log(value)}
      />

      <Search onChange={handleSearch} />

      <Stories items={searchedStories} onRemoveStory={handleRemoveStory} />
    </>
  );
}

export default App;
