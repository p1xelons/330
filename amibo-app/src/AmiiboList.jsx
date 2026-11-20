import PropTypes from "prop-types";

const AmiiboList = ({ results }) => {
  return (
    <div>
      {results.map((amiibo) => (
        <span key={amiibo.head + amiibo.tail} style={{ color: "green" }}>
          <h4>{amiibo.name}</h4>
          <img width="100" alt={amiibo.character} src={amiibo.image} />
        </span>
      ))}
    </div>
  );
};

AmiiboList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      head: PropTypes.string,
      tail: PropTypes.string,
      name: PropTypes.string,
      character: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};

export default AmiiboList;