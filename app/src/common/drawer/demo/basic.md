---
order: 0
title: 基本
---

最简单的用法。

````jsx
import {Button, Drawer} from 'jgui'

class DrawerDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: true};
    }

    handleToggle()  {
        this.setState({open: !this.state.open})
    }

    handleClose() {
        this.setState({open: false})
    }

    render() {
        const drawerProps = {
            open: this.state.open,
            size: 250,
            direction: 'right',
            zIndex: 101,
            transition: 'width .3s ease-out,height .3s ease',
        }

        return (
            <div>
                <Button type="primary" onClick={this.handleToggle.bind(this)}>toggle</Button>
                <Drawer {...drawerProps} >
                    <Button type="primary" onClick={this.handleToggle.bind(this)}>关闭</Button>
                </Drawer>
            </div>

        )
    }
}

ReactDOM.render(<DrawerDemo/>, mountNode);

````
