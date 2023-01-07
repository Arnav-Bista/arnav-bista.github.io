import "./Tile.css";

export default function Tile(props) {

    const redirect = () => {
        window.location.href = props.data.link;
    }

    return (
        <div className={"tile" + (props.data.link === "#" ? " disabled" : "")} onClick={redirect}>
            <div className="tile-header">
                <p>{props.data.title}</p>
            </div>
            <img src={props.data.src} />
            <div className="tile-body">
                <div className="multi-img">
                    {
                        props.data.language.length <= 1 ?
                        <img src={"./assets/images/" + props.data.language[0] + ".svg"}/>
                        :
                        props.data.language.map(
                            (language) => <img src={"./assets/images/" + language + "-icon.svg"}/>
                        )
                    }
                </div>
                <div className="tile-body-detail">
                    <p className="title">{props.data.title}</p>
                    <div className="img-credits">{"Photo by " + props.data.imgCredits}</div>
                </div>
            </div>
        </div>
    );
}