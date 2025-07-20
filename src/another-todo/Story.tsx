export interface IStory {
  objectID: number;
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
}

export function Story({
  objectID,
  title,
  url,
  author,
  numComments,
  points,
  onRemoveStory,
}: IStory & {
  onRemoveStory: (id: number) => void;
}) {
  return (
    <div id={`${objectID}`}>
      <span>
        <a href={url} target={"_blank"}>
          {title}
        </a>
      </span>
      <span>{author}</span>
      <span>{numComments}</span>
      <span>{points}</span>
      <span>
        <button type="button" onClick={() => onRemoveStory(objectID)}>
          ❌
        </button>
      </span>
    </div>
  );
}
