import React from "react";
import { Link } from "react-router-dom";
import whitestar from '../icon/whitestar.svg';
const JoinStartButton = ({title}) => {
    return(
        <div className="button-group mt-10">
            <Link className="button-join" to={'/'}>
                <span>
                    <span className="bg-style"><img height={30} width={30} src={whitestar} /></span><span className="bg-style bg-title-style">{title}</span>
                </span>
            </Link>
        </div>
    )
}
export default JoinStartButton;