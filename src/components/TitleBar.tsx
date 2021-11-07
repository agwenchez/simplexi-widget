import { h } from 'preact';
import style from './titlebar.css';
import { useContext } from 'preact/hooks';
import { ConfigContext, GlobalsContext } from '../AppContext';

interface OwnProps {
    routeTitle: string;
}
const TitleBar = (props: OwnProps) => {
    const config = useContext(ConfigContext);
    const { setWidgetOpen, widgetOpen } = useContext(GlobalsContext);

    return (
        <div className={style.root} onClick={() => setWidgetOpen(!widgetOpen)}>
                <a
                className={ !widgetOpen && style.minimized}
                title={!widgetOpen && 'Open'}
            />
              
            <h4>
                {widgetOpen
                    ? props.routeTitle
                    : config.text.minimizedTitle ??
                      'Need any help We are online'}
            </h4>
            <a
                className={widgetOpen && style.open }
                title={widgetOpen && 'Minimize' }
            />
        </div>
    );
};

export default TitleBar;
