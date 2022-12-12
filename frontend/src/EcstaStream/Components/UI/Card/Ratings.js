import imdb from '../../../assets/imdb.png';
import freshRT from '../../../assets/rtFresh.png';
import rt from '../../../assets/rt.png';
import meta from '../../../assets/metacritic.png';

const Ratings = ({rating}) => {
    const imgClassName = "h-6 w-6 m-auto rounded-md";
    const textClassName = "w-full text-xs font-thin pb-1"
  
    return (
        <li className="inline-flex h-12 w-12 px-1 float-right text-center justify-center">
            {rating.Source === 'Internet Movie Database' && (
                <div>
                    <img src={imdb} alt="imdb" className={imgClassName} title={rating.Source} /> 
                    <p className={textClassName}>{rating.Value}</p>
                </div>
                )
            }
            {rating.Source === 'Metacritic' && (
                <div>
                    <img src={meta} alt="meta" className={imgClassName} title={rating.Source} />
                    <p className={textClassName}>{rating.Value}</p>
                </div>
                )
            }
            {rating.Source === 'Rotten Tomatoes' && ( rating.Value.slice(0, rating.Value-1) >= 60 &&(
                <div>
                    <img src={freshRT} alt="fresh" className={imgClassName} title={rating.Source} />
                    <p className={textClassName}>{rating.Value}</p>
                </div>)
            )}
            
            {rating.Source === 'Rotten Tomatoes' && ( rating.Value.slice(0, rating.Value-1) < 60 &&(
                <div>
                    <img src={rt} alt="rt" className={imgClassName} title={rating.Source} />
                    <p className={textClassName}>{rating.Value}</p>
                </div>)
            )}
        </li>
    );
};

export default Ratings;