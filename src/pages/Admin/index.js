// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import ReservasChart from 'src/views/dashboard/graficoreservas'
import RateReviewIcon from '@mui/icons-material/RateReview';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventIcon from '@mui/icons-material/Event';
import CancelIcon from '@mui/icons-material/Cancel';


const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}  >
          <ReservasChart  />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <TotalEarning />
        </Grid>
        <Grid container spacing={8} style={{marginTop:"50px"}}>
      <Grid item xs={12} md={6} lg={3}>
        <CardStatisticsVerticalComponent
          stats='+616'
          icon={<EventIcon />}
          color='success'
          trendNumber='+42%'
          title='Reservas Realizadas'
          subtitle='Reservas mensuales'
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <CardStatisticsVerticalComponent
          stats='307'
          title='Usuarios Creados'
          trend='negative'
          color='secondary'
          trendNumber='-15%'
          subtitle='Usuarios creados mensualmente'
          icon={<AccountCircleIcon />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <CardStatisticsVerticalComponent
          stats='62'
          trend='negative'
          trendNumber='-18%'
          title='Reseñas realizadas'
          subtitle='Reseñas creadas por mes'
          icon={<RateReviewIcon />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <CardStatisticsVerticalComponent
          stats='8'
          color='warning'
          trend='negative'
          trendNumber='-18%'
          subtitle='canceladas por mes'
          title='Reservas canceladas'
          icon={<CancelIcon/>}
        />
      </Grid>
    </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
