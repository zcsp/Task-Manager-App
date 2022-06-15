import { Link as RrdLink } from 'react-router-dom';

function TopNav({ projects }: { projects: any[] }) {
  return (
    <nav>
      <RrdLink to="/">
        Home
      </RrdLink>
      {projects.map((p) => (
        <RrdLink to={`/project/${p.id}`}>
          {p.name}
        </RrdLink>
      ))}
    </nav>
  );
}

export default TopNav;
