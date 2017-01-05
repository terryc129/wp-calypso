# Tutorial: Building a Simple Tour

In this tutorial, we'll create a brief tour that shows a user how the site preview works. 

It's not a comprehensive tutorial, but walks you through many of the different tasks that you'll encounter when developing a tour using Guided Tours. 

For more complete technical information, please see the existing tours (linked to [in the README.md](../README.md)), the [API documentation](./docs/API.md), and the [architecture documentation](./ARCHITECTURE.md). 

## What Do We Want To Achieve? 

Before we think about what steps we want our tour to have, we should take a step back and think about **what goals we want to achieve** with our tour. 

In this case, we might want to make sure new users understand where the site preview is and how it works. 

In addition, we should think about how to **measure reaching this goal**. Here, we would hope that with our tour active, we would soon see an increase the usage of the site preview by new users. 

## Decide for Tour Steps

With that in mind, we can come up with this first draft for a set of steps:

1. Ask the user whether they want to learn how to preview their site. 
2. Point to the site preview and tell the user to click their site's title so that the preview opens. 
3. When the preview is showing, explain that this is the site preview. 
4. Show the user how to exit the preview and wait for them to do it. 
5. Finish the tour. 

We could have included a step — or even multiple steps — to explain the different device sizes or the SEO upgrade. But it's advisable to start off with tours that are as short as possible to see how they perform. We can always come back and add additional steps. 

And in that spirit, we can iterate over the steps once more to reduce them. We don't **really** need steps to ask whether a user wants to take the tour or not, and we don't **really** need a finishing step. Also, we could exit the tour while the preview is still open so the user can explore it without a tour step showing. 

With these thoughts, we can come up with these steps:

1. Point to the site preview and tell the user to click their site's title to learn about the site preview. Provide a "Quit" button though so it's obvious what to do if they don't want to take the tour. 
2. Show the user how to exit the preview, but finish the tour with the preview staying open. 

And with that, we can now think about what will trigger our tour. 

## Decide for Triggers

To start the tour, we need to provide a list of paths and a trigger function. 

We want our tour to start when the user is looking at their stats. We therefore use `[ '/stats' ]` as the path. Note that in the tour implementation, we can provide a single path as just a string as opposed to an array. 

We only want our tour to show for users who have registered in the past 7 days. We express that by giving the `Tour` element an appropriate `when` attribute. 

## Write the Tour

Now we're ready to actually start writing our tour. 

### Scaffolding etc.

First we'll need to create a file for our tour. Add makeTour stuff and imports. Template:

```
...
```

Now add that tour to the tour list. 

And add a feature flag to the dev environment. 

### The Tour element

Now in file between the makeTour paranthesis create the tour element:

```
<Tour
	name="sitePreview"
	version="20170104"
	path="/stats"
	when={ and( 
		isNewUser, 
		isEnabled( 'guided-tours/main' ),
		) }
	>
	<!-- this is where the tour steps go ... -->
</Tour>
```

- `name` is the tour's name. We use that to refer to it in the combine Tours thing and can later use it to force the tour to trigger via the query arg. 
- `version`
- `path`
- `when`

### Add an A/B Test

Also: a/b test. 

- decide for tour steps: what do you want to achieve? 
- make <Tour>
- add <Steps> with text and default positioning
- add an abtest and add the abtest selector as the last when condition
- to analyze the results later, you should also figure out what action you want users to do more of. this is beyond the scope of this document, however.

## 

abtest as last selector in trigger condition

custom styles:

https://github.com/Automattic/wp-calypso/blob/2846567096f164c1426b223887039f79808ae612/client/layout/guided-tours/tours/theme-sheet-welcome-tour.js#L121

```JSX
<Step
	...
	style={ { marginTop: '-15px', zIndex: 1 } }
>
```

animation delay: 

Use sparingly, or don't. Before you do, ask yourself whether what you are attempting to solve can't be solved with better selectors for `when`.

https://github.com/Automattic/wp-calypso/pull/10116/files

```JSX
style={ {
	animationDelay: '10s',
	marginTop: '-8px',
	zIndex: '100000',
} }
```


translation
how to do the calls and when to add them (when copy has been reworked, also maybe after `en` a/b test)

formatting with {{strong}} etc., adding GridIcons, ...

IMO all of the Translation section can be distilled down to a very brief sentence (e.g. "regular Calypso guidelines apply: minimize string churn*, use proper formatting and component interpolation (cf. i18n-calypso) when needed")

