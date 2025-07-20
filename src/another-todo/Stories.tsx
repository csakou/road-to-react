import { type IStory } from "./Story";
import { Story } from "./Story";

export function Stories({
  items,
  onRemoveStory,
}: {
  items: IStory[];
  onRemoveStory: (id: number) => void;
}) {
  return (
    <div>
      <h4>Your stories</h4>
      {items.map((item) => (
        <Story
          key={item.objectID}
          objectID={item.objectID}
          title={item.title}
          author={item.author}
          url={item.url}
          numComments={item.numComments}
          points={item.points}
          onRemoveStory={onRemoveStory}
        />
      ))}
    </div>
  );
}
