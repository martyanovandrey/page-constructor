import React, {Fragment, useContext} from 'react';

import {Icon} from '@gravity-ui/uikit';

import {LocaleContext} from '../../context/localeContext/localeContext';
import {LocationContext} from '../../context/locationContext/locationContext';
import {useAnalytics} from '../../hooks';
import {useMetrika} from '../../hooks/useMetrika';
import {Chevron} from '../../icons';
import {ClassNameProps, DefaultEventNames, LinkProps, TextSize, WithChildren} from '../../models';
import {block, getLinkProps, setUrlTld} from '../../utils';
import BackLink from '../BackLink/BackLink';
import FileLink from '../FileLink/FileLink';
import RouterLink from '../RouterLink/RouterLink';

import './Link.scss';

const b = block('link-block');
const WORD_JOINER_SYM = '\u200b';

export type LinkFullProps = LinkProps & ClassNameProps;

function getArrowSize(size: TextSize) {
    switch (size) {
        case 'l':
            return 20;
        case 'm':
            return 18;
        case 's':
            return 14;
        default:
            return 14;
    }
}

const LinkBlock = (props: WithChildren<LinkFullProps>) => {
    const {
        text,
        url,
        arrow,
        metrikaGoals,
        pixelEvents,
        analyticsEvents,
        theme = 'file-link',
        colorTheme = 'light',
        textSize = 'm',
        className,
        target,
        children,
    } = props;

    const handleMetrika = useMetrika();
    const handleAnalytics = useAnalytics(DefaultEventNames.Link, url);
    const {hostname} = useContext(LocationContext);
    const {tld} = useContext(LocaleContext);
    const href = setUrlTld(props.url, tld);
    const defaultTextSize = theme === 'back' ? 'l' : 'm';

    const onClick = () => {
        handleMetrika({metrikaGoals, pixelEvents});
        handleAnalytics(analyticsEvents);
    };

    const getLinkByType = () => {
        switch (theme) {
            case 'back':
                return <BackLink title={children || text} url={href} onClick={onClick} />;
            case 'file-link':
            case 'underline':
                return (
                    <FileLink
                        text={children || text}
                        href={href}
                        type="horizontal"
                        textSize={textSize}
                        onClick={onClick}
                    />
                );
            case 'normal': {
                const linkProps = getLinkProps(url, hostname, target);
                const content = children || text;

                return (
                    <RouterLink
                        className={b('link', {theme: colorTheme, 'has-arrow': arrow})}
                        href={href}
                        onClick={onClick}
                        {...linkProps}
                    >
                        {arrow ? (
                            <Fragment>
                                <span className={b('content')}>{content}</span>
                                {WORD_JOINER_SYM}
                                <Icon
                                    className={b('arrow')}
                                    data={Chevron}
                                    size={getArrowSize(textSize)}
                                />
                            </Fragment>
                        ) : (
                            content
                        )}
                    </RouterLink>
                );
            }
            default:
                return null;
        }
    };

    return (
        <div className={b({size: textSize || defaultTextSize}, className)}>{getLinkByType()}</div>
    );
};

export default LinkBlock;
