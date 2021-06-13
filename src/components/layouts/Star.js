import React, { useEffect, useState } from "react";

const Star = (props) => {
	const [stars, setStars] = useState([0, 0, 0, 0, 0]);

	useEffect(() => {
		let ts = [];
		let rating = (props.rating || 0) + 1;
		while (ts.length < 5) {
			rating--;

			if (rating > 1) {
				ts.push(1);
				continue;
			}

			if (rating < 0) {
				ts.push(0);
				continue;
			}

			ts.push(rating);
		}

		setStars(ts);

		// eslint-disable-next-line
	}, [props.rating]);

	return (
		<div style={{ "maxHeight": `36px`, "height": `100%` }}>
			{stars.map((item, i) => {
				return (
					<div className="star-container" key={i} style={{ "maxHeight": `36px` }}>
						<div className="star-fill" style={{ "width": `${parseInt(item * 31)}px`, "margin": "0", "padding": "0", "position": "relative", "top": `0px`, "left": `0px` }} />
						<button className="star-hover" style={{ "width": `31px`, "margin": "0", "padding": "0", "position": "relative", "top": `-36px`, "left": `0px` }} onClick={(e) => { props.onClick(i) }} />
						<img className="star-outline" style={{ "width": `31px`, "margin": "0", "padding": "0", "pointerEvents": "none", "position": "relative", "top": `-79px`, "left": `0px` }} src="/images/star.png" alt="stars alt"></img>
					</div>
				);
			})}
		</div>
	);
};

export default Star;