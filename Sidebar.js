import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { IconButton, Avatar } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                 <Avatar src="https://3.bp.blogspot.com/-bbhvVpzLjps/XNb_nQzoYyI/AAAAAAAAS7s/Utrfs8epOsoOcgnY9VPQuxpwbsG4CGn7QCKgBGAs/s320/123.png"/>
                <div className="sidebar_headerRight">
                   <IconButton> 
                       <DonutLargeIcon/>
                   </IconButton>
                   <IconButton>
                       <ChatIcon/>
                   </IconButton>
                   <IconButton>
                       <MoreVertIcon/>
                   </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined/>
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>
            <div className="sidebar_chat">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar