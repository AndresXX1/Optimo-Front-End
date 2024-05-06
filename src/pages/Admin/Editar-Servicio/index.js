// ** React Imports

import { useState } from 'react'

// ** MUI Imports

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports

import EditIcon from '@mui/icons-material/Edit';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessIcon from '@mui/icons-material/Business';

// ** Demo Tabs Imports

import TabInfo from '../../../Components/admin/Editar-Servicio/pisos'
import TabAccount from '../../../Components/admin/Editar-Servicio/seleccion'
import TabSecurity from '../../../Components/admin/Editar-Servicio/oficinas'
import TabAccountst from '../../../Components/admin/Editar-Servicio/TabAccount'

// ** Third Party Styles Imports

import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('new')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
  value='new'
  label={
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <StorefrontIcon />
      <TabName>Crear nuevo servicio</TabName>
    </Box>
  }
/>
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EditIcon />
                <TabName>Editar datos de servicio</TabName>
              </Box>
            }
          />

          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StorefrontIcon />
                <TabName>Editar Locales</TabName>
              </Box>
            }
          />


        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>

          <TabPanel sx={{ p: 0 }} value='new'>
         < TabAccountst/>
         </TabPanel>
       
       
      </TabContext>
    </Card>
  )
}

export default AccountSettings