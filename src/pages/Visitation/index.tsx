import { Link } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
import sections from './sections';

function Visitation() {
  return (
    <AppLayout pageTitle='Visitation'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {sections.map((section) => (
          <Link
            className='bg-primary text-white h-60 rounded-xl text-2xl flex items-center justify-center'
            key={section.name}
            to={section.link}
          >
            {section.name}
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}

export default Visitation;
