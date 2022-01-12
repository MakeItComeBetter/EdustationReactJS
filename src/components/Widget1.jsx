import React from 'react';
import { Link } from 'react-router-dom';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';

/**
 * props: progress, title, num, lesson, content
 */
const Widget1 = (props) => {
  let { progress, title, num, lesson, content, link } = props;

  

  return (

    <Link to={link ? link : "#"} replace>
      <div className="widget">
        <div className="widget_header">
          <CircularProgressWithLabel value={progress} color="error" />
        </div>
        <span>{title}</span>
        <div className="widget_footer">
          <div className="widget_footer_end">
            <span>{num}</span>
          </div>
          <div className="widget_footer_content">
            <span>{lesson}</span>
            <small>{content}</small>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Widget1
