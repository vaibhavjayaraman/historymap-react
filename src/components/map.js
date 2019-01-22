import React, {Component} from "react";

import MapAPI from "./mapcomponents/map_api"
import SideBar from "./mapcomponents/sidebar"
import NavBar from "./mapcomponents/navbar"
import L from "leaflet"
import "./map.css"


class Map extends Component {

    state = {
        sideBarWidth: "0px",
        sideBarZIndex: -1,
        sideBarOpen: false,
        wikiRange: 5000,
        opacity: 70,
    };


    setMap = map => {
        const wikiMarkers = L.layerGroup().addTo(map);
        this.setState({wikiMarkers, map})
    };

    removeWikiMarkers = () => {
        if (this.state.wikiMarkers != []) {
            this.state.wikiMarkers.clearLayers();
        }
    }

    removeMarkers  = () => {
        this.removeWikiMarkers();
    }

    toggleSideBar = () => {
        if (!this.state.sideBarOpen) {
            const sideBarWidth = "20%";
            const sideBarZIndex = 1;
            const sideBarOpen = true;
            this.setState({sideBarWidth, sideBarZIndex, sideBarOpen})
        } else {
            const sideBarWidth = "0";
            const sideBarZIndex = -1;
            const sideBarOpen = false;
            this.setState({sideBarWidth, sideBarZIndex, sideBarOpen})
        }
    };

    setWikiRange = val => {
        if (val < 11) {
            val = 11;
        }
        if (val > 9999) {
            val = 9999;
        }
        this.setState({wikiRange: val})
    }

    setOpacity = val => {
        console.log(val);
        if (val <= 0) {
            val = 1;
        }
        if (val >= 99) {
            val = 99;
        }
        this.setState({opacity: val});
    }

    render () {
        return (
            <React.Fragment>
                    <NavBar toggleSideBar = {this.toggleSideBar}
                            removeWikiMarkers = {this.removeWikiMarkers}
                            removeMarkers = {this.removeMarkers}
                            opacity = {this.state.opacity}
                            wikiRange = {this.state.wikiRange}
                            map = {this.state.map}
                            />
                    <div id="content">
                        <SideBar width = {this.state.sideBarWidth}
                                 zIndex = {this.state.sideBarZIndex}
                                 removeWikiMarkers = {this.removeWikiMarkers}
                                 removeMarkers = {this.removeMarkers}
                                 setWikiRange= {this.setWikiRange}
                                 setOpacity = {this.setOpacity}

                        />
                        <MapAPI setMap={this.setMap}
                            mapContainer = "content"/>
                    </div>
            </React.Fragment>
        )
    }
}

export default Map;
