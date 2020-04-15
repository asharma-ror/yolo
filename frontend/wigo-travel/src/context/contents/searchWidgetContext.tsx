import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { PrismicSearchWidget } from "../../__generated__/PrismicSearchWidget"

export const SearchWidgetContext = React.createContext<SearchWidgetLabels>({
  common: {
    cancelButton: "",
    confirmButton: "",
  },
  calendar: {
    title: "",
    nightPluralLabel: "",
    nightSingularLabel: "",
  },
  destination: {
    title: "",
    everywhereLabel: "",
  },
  passengers: {
    title: "",
    peopleSingularLabel: "",
    peoplePluralLabel: "",
  },
  messages: {
    apiErrorMessage: "",
  },
})

const SearchWidgetProvider = ({ children }: any) => {
  const { prismicSearchWidget } = useStaticQuery<PrismicSearchWidget>(graphql`
    query PrismicSearchWidget {
      prismicSearchWidget {
        data {
          calendar_night_plural_label {
            text
          }
          calendar_night_singular_label {
            text
          }
          calendar_title {
            text
          }
          cancel_label {
            text
          }
          confirm_label {
            text
          }
          destination_everywhere_label {
            text
          }
          destinations_title {
            text
          }
          people_plural_label {
            text
          }
          people_singular_label {
            text
          }
          people_title {
            text
          }
          title {
            text
          }
          api_error_message {
            text
          }
        }
      }
    }
  `)

  return (
    <SearchWidgetContext.Provider
      value={{
        common: {
          cancelButton:
            prismicSearchWidget?.data?.cancel_label?.[0]?.text ?? "",
          confirmButton:
            prismicSearchWidget?.data?.confirm_label?.[0]?.text ?? "",
        },
        calendar: {
          nightPluralLabel:
            prismicSearchWidget?.data?.calendar_night_plural_label?.[0]?.text ??
            "",
          nightSingularLabel:
            prismicSearchWidget?.data?.calendar_night_singular_label?.[0]
              ?.text ?? "",
          title: prismicSearchWidget?.data?.calendar_title?.[0]?.text,
        },
        destination: {
          title: prismicSearchWidget?.data?.destinations_title?.[0]?.text ?? "",
          everywhereLabel:
            prismicSearchWidget?.data?.destination_everywhere_label?.[0]
              ?.text ?? "",
        },
        passengers: {
          title: prismicSearchWidget?.data?.people_title?.[0]?.text ?? "",
          peoplePluralLabel:
            prismicSearchWidget?.data?.people_plural_label?.[0]?.text ?? "",
          peopleSingularLabel:
            prismicSearchWidget?.data?.people_singular_label?.[0]?.text ?? "",
        },
        messages: {
          apiErrorMessage:
            prismicSearchWidget?.data?.api_error_message?.[0]?.text ?? "",
        },
      }}
    >
      {children}
    </SearchWidgetContext.Provider>
  )
}

export { SearchWidgetProvider }

export interface Messages {
  apiErrorMessage: string
}

export interface CommonLabels {
  cancelButton: string
  confirmButton: string
}

export interface CalendarLabels {
  title: any
  nightSingularLabel: string
  nightPluralLabel: string
}

export interface DestinationLabels {
  title: any
  everywhereLabel: string
}

export interface PassengersLabels {
  title: any
  peopleSingularLabel: string
  peoplePluralLabel: string
}

export interface SearchWidgetLabels {
  calendar: CalendarLabels
  destination: DestinationLabels
  passengers: PassengersLabels
  common: CommonLabels
  messages: Messages
}
