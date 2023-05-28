import SlidePopup from "../../Presets/SlidePopup/SlidePopup";
import styles from './index.module.scss';
import {useRef} from "react";
import CmsButton from "../../../components/CmsButton/CmsButton";

const TwoActionPopup = props => {
    const {payload = {}} = props;
    const {message, primaryText, secondaryText} = payload;

    const ref = useRef();

    const onButtonClick = (e, isPrimary = false) => {
        e.preventDefault();
        const { onPrimaryClick = () => {}, onSecondaryClick = () => {} } = payload;
        ref.current.animateOut(
            isPrimary ?
                onPrimaryClick:
                onSecondaryClick
        );
    };

    return (
        <SlidePopup ref={ref} className={styles['two-action-popup']} id={props.id}>
            <h2 className={styles['message']}>{message}</h2>
            <div className={styles['actions-wrapper']}>
                <CmsButton
                    title={primaryText}
                    className={'delete'}
                    onClick={(e) => onButtonClick(e, true)}
                />
                <CmsButton
                    title={secondaryText}
                    className={'create'}
                    onClick={(e) => onButtonClick(e, false)}
                />
            </div>
        </SlidePopup>
    )
};

export default TwoActionPopup;