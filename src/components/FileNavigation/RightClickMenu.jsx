import { ContextMenu, MenuItem } from 'react-contextmenu';
import React from 'react';
import PropTypes from 'prop-types';
import './RightClickMenu.scss';

const RightClickMenu = ({ menuId, itemList }) => (
    <ContextMenu id={menuId} className="list-group directory-context-menu">
        {itemList.map((item) => (
            <MenuItem key={item.menuItem} className="list-group-item list-group-item-action" onClick={item.callback}>
                {item.menuItem}
            </MenuItem>
        ))}
    </ContextMenu>
);

RightClickMenu.propTypes = {
    menuId: PropTypes.string.isRequired,
    itemList: PropTypes.arrayOf(
        PropTypes.shape({
            menuItem: PropTypes.string.isRequired,
            callback: PropTypes.func.isRequired,
        }),
    ).isRequired,
};

export default RightClickMenu;
