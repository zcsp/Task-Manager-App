import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import './UpdateCard.scss';

const UpdateCard = ({ update }: { update: any }) => {
  return (
    <div className="update-card">
      {update?.user?.name && <h4>{update.user.name}</h4>}
      <ReactMarkdown rehypePlugins={[rehypeRaw]} children={update.content} />
    </div>
  )
}

export default UpdateCard;