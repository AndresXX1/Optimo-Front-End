import React from 'react';
import { IconButton } from '@mui/material';
import equipmentIcons from "../iconsEquipamiento/Icons";

const AllEquipmentIcons = ({ equipment }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 350px)', gap: '10px' }}>
            {equipment.map((item, index) => {
                const IconComponent = equipmentIcons[item];

                return IconComponent ? (
                    
                    <div key={index} style={{ display: 'flex', alignItems: 'center',fontSize:"20px" }}>
                        <IconButton>
                            <IconComponent style={{ fontSize: 40 }} />
                        </IconButton>
                        <span>{item}</span>
                    </div>
                ) : (
                    <span key={index}>{item}</span> 
                );
            })}
        </div>
    );
};

export default AllEquipmentIcons;