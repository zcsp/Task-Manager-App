import { Link as RrdLink } from 'react-router-dom';
import { useAppDataContext } from '../../contexts/AppContext';
import CurrentUserSelect from '../CurrentUserSelect';
import NewProjectButton from '../NewProjectButton';
import './Navigation.scss';

function SideNav() {

  const { projectList, resetProjectList } = useAppDataContext();

  if (!projectList) {
    return <>Loading...</>
  }

  return (
    <div id="side-nav">
      <nav>
        <RrdLink to="/">
          Home
        </RrdLink>
        {projectList.map((p: any) => (
          <RrdLink to={`/project/${p.id}`} key={p.id}>
            {p.name}
          </RrdLink>
        ))}
      </nav>
      <div id="side-nav-actions">
        <div>
          <label>
            Current User
            <CurrentUserSelect />
          </label>
        </div>
        <NewProjectButton afterSubmit={resetProjectList} />
      </div>
    </div>
  );
}

export default SideNav;
