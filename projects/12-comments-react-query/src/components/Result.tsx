import { type CommentWithId } from '../service/comments'

export const Result = ({ data }: { data?: CommentWithId[] }) => {
  return (
    <ul className='list-comments'>
      <li>
        {data?.map(comment => (
          <article
            key={comment.id}
            className={
              comment.preview === true ? 'article-preview article' : 'article'
            }
          >
            <h5>{comment.title}</h5>
            <p>{comment.message}</p>
          </article>
        ))}
      </li>
    </ul>
  )
}
