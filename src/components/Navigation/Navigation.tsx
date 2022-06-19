import { Link as RrdLink } from 'react-router-dom';
import NewProjectButton from '../NewProjectButton';
import './Navigation.scss';

function SideNav({ projects }: { projects: any[] }) {

  return (
    <div id="side-nav">
      <nav>
        <RrdLink to="/">
          Home
        </RrdLink>
        {projects.map((p) => (
          <RrdLink to={`/project/${p.id}`} key={p.id}>
            {p.name}
          </RrdLink>
        ))}
      </nav>
      <div id="side-nav-actions">
        {/* todo: move projects and all to context and make afterSubmit reusable */}
        <NewProjectButton afterSubmit={() => { }} />
      </div>
    </div>
  );
}

export default SideNav;
