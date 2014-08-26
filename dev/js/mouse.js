/**
 * @jsx React.DOM
 */

var Mouse = React.createClass({displayName: 'Mouse',
    getDefaultProps: function () {
    return {
      // allow the initial position to be passed in as a prop
      initialPos: {x: 0, y: 0}
    }
  },
  getInitialState: function () {
    return {
      pos: this.props.initialPos,
      rel: null // position relative to the cursor
    }
  },
  // we could get away with not having this (and just having the listeners on
  // our div), but then the experience would be possibly be janky. If there's
  // anything w/ a higher z-index that gets in the way, then you're toast,
  // etc.
  componentDidUpdate: function (props, state) {
    //console.log(props);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('touchmove', this.onTouchMove);
   /* if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
    }*/
  },
  onMouseMove: function (e) {
    this.setState({
      pos: {
        x: e.pageX-50 ,
        y: e.pageY-50
      }
    })
    e.stopPropagation()
    e.preventDefault()
  },

  onTouchMove: function (e) {
    this.setState({
      pos: {
         x: e.pageX-50 ,
        y: e.pageY-50
      }
    })
    e.stopPropagation()
    e.preventDefault()
  },
  render: function () {
    // transferPropsTo will merge style & other props passed into our
    // component to also be on the child DIV.
    return this.transferPropsTo(React.DOM.div({
      onMouseMove: this.onMouseMove,
      onTouchMove: this.onTouchMove,
      style: {
        position: 'absolute',
        left: this.state.pos.x + 'px',
        top: this.state.pos.y + 'px',
      }
    }, this.props.children));




    }
});

React.renderComponent(Mouse({
    initialPos: {x: 100, y: 200},
    className: 'mouse',
    style: {
        border: '1px solid #aa5',
        background: 'green',
        color:'white',
        padding: '10px',
        width: '100px',
        height: '100px',
        position: 'absolute',
    }
}, 'Flytt meg'), document.body);
