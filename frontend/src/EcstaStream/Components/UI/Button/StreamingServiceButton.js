import { Fragment } from "react";

const StreamingServiceButton = ({service}) => {
    return (
        <Fragment>
            <img
                id={"service_img_" + service.provider_name} 
                //src={TMBD_POSTER_w45 + service.logo_path}
                src={'/ServicesImages/' + service.provider_id + '.jpg'} 
                alt={service.provider_name}
                className="h-10 w-10 m-auto rounded-xl text-xs text-input-fill"
                title={service.provider_name}
            />
        </Fragment>
    );
}

export default StreamingServiceButton;