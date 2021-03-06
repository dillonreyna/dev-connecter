import React, { Component } from "react";
import Moment from "react-moment";

import isEmpty from "../../validation/isEmpty";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="MM/DD/YYYY">{exp.from}</Moment>{" "}
          {exp.to === null ? (
            <span> - Current</span>
          ) : (
            <span>
              {" "}
              - <Moment format="MM/DD/YYYY">{exp.to}</Moment>
            </span>
          )}
        </p>
        <p>
          <strong>Position: </strong>
          {exp.title}
        </p>
        <p>
          {isEmpty(exp.location) ? null : (
            <p>
              <strong>Location: </strong>
              {exp.location}
            </p>
          )}
        </p>
        <p>
          {isEmpty(exp.description) ? null : (
            <p>
              <strong>Description: </strong>
              {exp.description}
            </p>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="MM/DD/YYYY">{edu.from}</Moment>{" "}
          {edu.to === null ? (
            <span> - Current</span>
          ) : (
            <span>
              {" "}
              - <Moment format="MM/DD/YYYY">{edu.to}</Moment>
            </span>
          )}
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field of Study: </strong>
          {edu.fieldOfStudy}
        </p>
        <p>
          {isEmpty(edu.description) ? null : (
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No experience data provided.</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No experience data provided.</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
