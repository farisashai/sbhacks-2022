import './style.less'

const Header = () => {
  return <div className="header">
    <div className="header-left">
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.655 1.46513L1.47542 12.647C1.0081 13.1078 0.637011 13.657 0.383722 14.2625C0.130433 14.868 -1.55953e-06 15.5178 -1.53084e-06 16.1742C-1.50215e-06 16.8306 0.130433 17.4804 0.383722 18.0859C0.637011 18.6914 1.0081 19.2406 1.47543 19.7014L31.4878 49.7199C31.9476 50.1885 32.4965 50.5604 33.102 50.8139C33.7076 51.0673 34.3577 51.1972 35.0142 51.1958L46.1938 51.1958C47.5184 51.1892 48.7869 50.66 49.7235 49.7232C50.6602 48.7863 51.1893 47.5176 51.1959 46.1927L51.1959 35.0108C51.1972 34.3542 51.0674 33.704 50.814 33.0983C50.5606 32.4925 50.1887 31.9436 49.7203 31.4836L19.7079 1.46513C19.2455 1.00073 18.6959 0.632239 18.0908 0.380801C17.4856 0.129363 16.8368 -7.1804e-05 16.1815 -7.17754e-05C15.5262 -7.17467e-05 14.8773 0.129363 14.2722 0.380801C13.667 0.63224 13.1174 1.00073 12.655 1.46513V1.46513ZM45.1934 35.4361L45.1934 45.1921L35.4394 45.1921L14.4307 24.1791L24.1848 14.4231L45.1934 35.4361ZM19.933 10.1705L10.179 19.9265L6.42746 16.1742L16.1815 6.41819L19.933 10.1705Z" fill="black"/>
    </svg>
      <h1>Quizlash</h1>
    </div>
    <div className="header-right">
      <button className="join-game">
        Join Game
      </button>
    </div>
  </div>
};

export default Header;
