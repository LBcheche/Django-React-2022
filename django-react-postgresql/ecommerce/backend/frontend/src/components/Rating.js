import React from 'react'
import Star from './Star'

const composeStars = (value, color) => 
{
    const starsRow = []
    var starValue = 1 
    var ratingValue = parseFloat(value)

    for (var i = 0; i < 5; i++) 
    {
        if (ratingValue >= 1)
        {   
            starValue = 1
            ratingValue -= 1 
        }
        else if (ratingValue === 0.5)
        { 
            starValue = ratingValue
            ratingValue -= 0.5
        }
        else
            starValue = ratingValue

        starsRow.push(<Star key={i} starValue= {starValue} color = {color}/>);
    }

    return starsRow
  };

function Rating({value, text, color}) {
  return (
    <div className='rating'>
        {composeStars(value, color)}
        <span>{text && text}</span>
    </div>
  )
}

export default Rating
