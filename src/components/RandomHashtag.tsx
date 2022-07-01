import sample from "../utils/sample";

const HASHTAGS = [
  'AlwaysStayMoving',
  'GetThisShitDone'
]

const RandomHashtag = () => {
  return (
    <p style={{ color: '#ccc' }}>
      #{sample(HASHTAGS)}
    </p>
  )
}

export default RandomHashtag;