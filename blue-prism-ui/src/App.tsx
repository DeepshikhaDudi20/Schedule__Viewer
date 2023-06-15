import ScheduleViewer from './components/ScheduleDetails/ScheduleViewer';
import './App.scss';

const App = () => {
  return (
    <div className='schedule-container'>
      <header className='schedule-container__header'>
        <h1>Schedule List & Log Entries</h1></header>
      <main className='schedule-container__content'>
        <ScheduleViewer />
      </main>
      <footer className='schedule-container__footer'>Blue Prism Assignment</footer>
    </div>
  );
};

export default App;
