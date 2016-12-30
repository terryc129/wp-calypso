/**
 * External Dependencies
 */

import React, { PropTypes, PureComponent } from 'react';

/**
 * Internal Dependencies
 */

import Card from 'components/card';
import Gridicon from 'components/gridicon';

import styles from './styles.scss';

// todo: move this file!
const components = require( '../../../server/devdocs/proptypes-index.json' );

class PropsViewer extends PureComponent {
	constructor( props ) {
		super( props );
	}

	/**
	 * Finds a non-example component in the library of components
	 * @param {string} slug The slug to search for
	 * @return {Array} An array of component matches
	 */
	findRealComponent = ( slug ) => {
		// remove the last character. As of right now, all plural display names are with just an 's'
		const singular = slug.slice( 0, -1 );
		return components.filter( ( component ) => {
			return ( slug === component.slug || singular === component.slug ) && component.includePath.indexOf( 'example' ) < 0;
		} );
	};

	/**
	 * Set the state of this component to the first matching slug
	 * @param {string} slug The slug to search for
	 */
	setComponent = ( slug ) => {
		let component = this.findRealComponent( slug );
		if ( component.length > 0 ) {
			component = component[ 0 ];
		} else {
			component = null;
		}

		this.setState( {
			component
		} );
	};

	componentWillMount() {
		this.setComponent( this.props.component );
	}

	componentWillReceiveProps( nextProps ) {
		this.setComponent( nextProps.component );
	}

	render() {
		const component = this.state.component;

		/**
		 * Renders a row in the table
		 * @param {string} propName The name of the prop
		 * @return {ReactElement} The row
		 */
		const row = ( propName ) => {
			const prop = component.props[ propName ];
			return (
				<tr key={ propName } className={ styles.tr } >
					<td>{ prop.required ? <Gridicon icon="checkmark" /> : <Gridicon icon="cross-small" /> }</td>
					<td>{ propName }</td>
					<td>{ prop.type ? prop.type.name : 'not in propTypes' }</td>
					<td>{ prop.defaultValue ? prop.defaultValue.value : 'undefined' }</td>
					<td>{ prop.description }</td>
				</tr>
			);
		};

		/**
		 * Sort prop names by (required, name)
		 * @param {string} leftName The prop name of the left side
		 * @param {string} rightName The prop name of the right side
		 * @return {number} Which side wins
		 */
		const sortProps = ( leftName, rightName ) => {
			const left = component.props[ leftName ];
			const right = component.props[ rightName ];
			if ( left.required === right.required ) {
				return ( leftName.toLowerCase() < rightName.toLowerCase() ? -1 : 1 );
			}

			if ( left.required ) {
				return -1;
			}

			return 1;
		};

		/**
		 * Renders a table if it can
		 * @return {*} The table
		 */
		const table = () => {
			if ( ! component ) {
				return null; //todo: explain why this table is missing
			}

			return (
				<Card compact={ true } tagName="div">
					<h1 className={ styles.name }>{ component.displayName }</h1>
					<p className={ styles.description } >{ component.description }</p>
					<div className={ styles.example }>
						<p><code>
							import { component.displayName } from '{ component.includePath }';
							{ null }
						</code></p>
					</div>
					<div className={ styles.tableWrapper }>
						<table className={ styles.table }>
							<thead>
							<tr>
								<td>Required</td>
								<td>Name</td>
								<td>Type</td>
								<td>Default</td>
								<td>Description</td>
							</tr>
							</thead>
							<tbody>
							{ component.props
								? Object.keys( component.props )
									.sort( sortProps )
									.map( ( propName ) => row( propName ) )
								: null }
							</tbody>
						</table>
					</div>
				</Card>
			);
		};

		return (
			<div>
				{ this.props.example }
				{ table() }
			</div>
		);
	}
}

PropsViewer.propTypes = {
	/**
	 * The slug of the component being displayed
	 */
	component: PropTypes.object.isRequired,

	/**
	 * The element to display as an example of this component
	 */
	example: PropTypes.element.isRequired
};

export default PropsViewer;
