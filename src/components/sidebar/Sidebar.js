import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DomHandler from '../utils/DomHandler';
import { CSSTransition } from 'react-transition-group';

export class Sidebar extends Component {

    static defaultProps = {
        id: null,
        style: null,
        className: null,
        visible: false,
        position: 'left',
        fullScreen: false,
        blockScroll: false,
        baseZIndex: 0,
        dismissable: true,
        showCloseIcon: true,
        ariaCloseLabel: 'close',
        closeOnEscape: true,
        iconsTemplate: null,
        modal: true,
        onShow: null,
        onHide: null
    };

    static propTypes = {
        id: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string,
        visible: PropTypes.bool,
        position: PropTypes.string,
        fullScreen: PropTypes.bool,
        blockScroll: PropTypes.bool,
        baseZIndex: PropTypes.number,
        dismissable: PropTypes.bool,
        showCloseIcon: PropTypes.bool,
        ariaCloseLabel: PropTypes.string,
        closeOnEscape: PropTypes.bool,
        iconsTemplate: PropTypes.func,
        modal: PropTypes.bool,
        onShow: PropTypes.func,
        onHide: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.onCloseClick = this.onCloseClick.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExit = this.onExit.bind(this);
    }

    onCloseClick(event) {
        this.props.onHide();
        event.preventDefault();
    }

    onEnter() {
        this.container.style.zIndex = String(this.props.baseZIndex + DomHandler.generateZIndex());
        if (this.props.modal) {
            this.enableModality();
        }
    }

    onEntered() {
        if (this.props.closeOnEscape) {
            this.bindDocumentEscapeListener();
        }

        if (this.closeIcon) {
            this.closeIcon.focus();
        }

        if (this.props.onShow) {
            this.props.onShow();
        }
    }

    onExit() {
        this.unbindMaskClickListener();
        this.unbindDocumentEscapeListener();

        if (this.props.modal) {
            this.disableModality();
        }
    }

    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
            let maskClassName = 'p-component-overlay p-sidebar-mask';
            if(this.props.blockScroll) {
                maskClassName += ' p-sidebar-mask-scrollblocker';
            }
            DomHandler.addMultipleClasses(this.mask, maskClassName);

            if (this.props.dismissable) {
                this.bindMaskClickListener();
            }

            document.body.appendChild(this.mask);

            if (this.props.blockScroll) {
                DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
        }
    }

    disableModality() {
        if (this.mask) {
            this.unbindMaskClickListener();
            document.body.removeChild(this.mask);

            if (this.props.blockScroll) {
                let bodyChildren = document.body.children;
                let hasBlockerMasks;
                for (let i = 0; i < bodyChildren.length; i++) {
                    let bodyChild = bodyChildren[i];
                    if (DomHandler.hasClass(bodyChild, 'p-sidebar-mask-scrollblocker')) {
                        hasBlockerMasks = true;
                        break;
                    }
                }

                if (!hasBlockerMasks) {
                    DomHandler.removeClass(document.body, 'p-overflow-hidden');
                }
            }
            this.mask = null;
        }
    }

    bindDocumentEscapeListener() {
        this.documentEscapeListener = (event) => {
            if (event.which === 27) {
                if (parseInt(this.container.style.zIndex, 10) === (DomHandler.getCurrentZIndex() + this.props.baseZIndex)) {
                    this.onCloseClick(event);
                }
            }
        };
        document.addEventListener('keydown', this.documentEscapeListener);
    }

    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            document.removeEventListener('keydown', this.documentEscapeListener);
            this.documentEscapeListener = null;
        }
    }

    bindMaskClickListener() {
        if (!this.maskClickListener) {
            this.maskClickListener = (event) => {
                this.onCloseClick(event);
            };
            this.mask.addEventListener('click', this.maskClickListener);
        }
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.mask.removeEventListener('click', this.maskClickListener);
            this.maskClickListener = null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.mask && prevProps.dismissable !== this.props.dismissable) {
            if (this.props.dismissable) {
                this.bindMaskClickListener();
            }
            else {
                this.unbindMaskClickListener();
            }
        }
    }

    componentWillUnmount() {
        this.unbindMaskClickListener();
        this.disableModality();
    }

    renderCloseIcon() {
        if (this.props.showCloseIcon) {
            return (
                <button type="button" ref={el => this.closeIcon = el} className="p-sidebar-close p-link" onClick={this.onCloseClick} aria-label={this.props.ariaCloseLabel}>
                    <span className="p-sidebar-close-icon pi pi-times"/>
                </button>
            );
        }

        return null;
    }

    renderIconsTemplate() {
        if (this.props.iconsTemplate) {
            return this.props.iconsTemplate(this);
        }

        return null;
    }

    render() {
        const className = classNames('p-sidebar p-component', this.props.className, 'p-sidebar-' + this.props.position,
                                       {'p-sidebar-active': this.props.visible, 'p-sidebar-full': this.props.fullScreen});
        const closeIcon = this.renderCloseIcon();
        const iconsTemplate = this.renderIconsTemplate();

        const transitionTimeout = {
            enter: this.props.fullScreen ? 400 : 300,
            exit: this.props.fullScreen ? 400 : 300
        };

        return (
            <CSSTransition classNames="p-sidebar" in={this.props.visible} timeout={transitionTimeout}
                    unmountOnExit onEnter={this.onEnter} onEntered={this.onEntered} onExit={this.onExit}>
                <div ref={(el) => this.container=el} id={this.props.id} className={className} style={this.props.style} role="complementary">
                    <div className="p-sidebar-content">
                        {closeIcon}
                        {iconsTemplate}
                        {this.props.children}
                    </div>
                </div>
            </CSSTransition>
        );
    }
}
