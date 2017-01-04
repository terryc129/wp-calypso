/**
 * External dependencies
 */
import React from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import observe from 'lib/mixins/data-observe';
import Card from 'components/card';
import MeSidebarNavigation from 'me/sidebar-navigation';
import config from 'config';
import CreditCards from 'me/purchases/credit-cards';
import eventRecorder from 'me/event-recorder';
import PurchasesHeader from '../purchases/list/header';
import BillingHistoryTable from './billing-history-table';
import UpcomingChargesTable from './upcoming-charges-table';
import SectionHeader from 'components/section-header';
import Main from 'components/main';
import purchasesPaths from 'me/purchases/paths';
import QueryBillingData from 'components/data/query-billing-data';
import { getBillingData } from 'state/billing-data/selectors';

const BillingHistory = React.createClass( {
	mixins: [ observe( 'sites' ), eventRecorder ],

	render() {
		const { billingData, sites, translate } = this.props;
		const hasBillingHistory = ! isEmpty( billingData.past );

		return (
			<Main className="billing-history">
				<MeSidebarNavigation />
				<QueryBillingData />
				<PurchasesHeader section={ 'billing' } />
				<Card className="billing-history__receipts">
					<BillingHistoryTable transactions={ billingData && billingData.past } />
				</Card>
				<Card href={ purchasesPaths.purchasesRoot() }>
					{ translate( 'Go to "Purchases" to add or cancel a plan.' ) }
				</Card>
				{ hasBillingHistory &&
					<div>
						<SectionHeader label={ translate( 'Upcoming Charges' ) } />
						<Card className="billing-history__upcoming-charges">
							<UpcomingChargesTable sites={ sites } transactions={ billingData && billingData.upcoming } />
						</Card>
					</div>
				}
				{ config.isEnabled( 'upgrades/credit-cards' ) &&
					<CreditCards />
				}
			</Main>
		);
	}
} );

export default connect(
	( state ) => ( {
		billingData: getBillingData( state )
	} )
)( localize( BillingHistory ) );
