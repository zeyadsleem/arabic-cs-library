---
title: "التعامل مع بنى بيانات كبيرة في الاختبار"
lang: ar
source: "https://stevekinney.com/courses/testing/asymmetric-matching-example"
---

الأمثلة الصغيرة التي لدينا سهلة الفهم، لكنها لا تعرض دائمًا ما قد تراه في الواقع على نحو سليم. (هذا في الغالب لأن استيعاب قاعدة شيفرة كبيرة بالكامل قد يستغرق أيامًا أو أسابيع، لذا أختار تبسيط الأمور قليلًا.)

لن أُشغلك بتفاصيل التطبيق الذي أعمل عليه، لكن لدينا أشياء تسمى **سير العمل (Workflows)**، ولها **سجل أحداث (Event History)** يتكوّن من **أحداث (Events)**. أخذت أحد تلك الأحداث الخام. من أجل متعة مشاهدتك، ها هو:

```json
{
  "id": "5",
  "name": "Marker: Version",
  "events": {},
  "eventIds": {},
  "initialEvent": {
    "eventId": "5",
    "eventTime": "2022-07-01T20:28:48.820951669Z",
    "eventType": "MarkerRecorded",
    "version": "0",
    "taskId": "29887307",
    "markerRecordedEventAttributes": {
      "markerName": "Version",
      "details": {
        "change-id": {
          "payloads": [
            {
              "metadata": {
                "encoding": "anNvbi9wbGFpbg=="
              },
              "data": "ImluaXRpYWwgdmVyc2lvbiI="
            }
          ]
        },
        "version": {
          "payloads": [
            {
              "metadata": {
                "encoding": "anNvbi9wbGFpbg=="
              },
              "data": "Mw=="
            }
          ]
        }
      },
      "workflowTaskCompletedEventId": "4",
      "header": null,
      "failure": null
    },
    "attributes": {
      "type": "markerRecordedEventAttributes",
      "markerName": "Version",
      "details": {
        "change-id": {
          "payloads": [
            {
              "metadata": {
                "encoding": "anNvbi9wbGFpbg=="
              },
              "data": "ImluaXRpYWwgdmVyc2lvbiI="
            }
          ]
        },
        "version": {
          "payloads": [
            {
              "metadata": {
                "encoding": "anNvbi9wbGFpbg=="
              },
              "data": "Mw=="
            }
          ]
        }
      },
      "workflowTaskCompletedEventId": "4",
      "header": null,
      "failure": null
    },
    "category": "marker",
    "id": "5",
    "name": "MarkerRecorded",
    "timestamp": "2022-07-01 UTC 20:28:48.82"
  },
  "timestamp": "2022-07-01 UTC 20:28:48.82",
  "category": "marker",
  "eventTime": "2022-07-01T20:28:48.820951669Z",
  "attributes": {
    "type": "markerRecordedEventAttributes",
    "markerName": "Version",
    "details": {
      "change-id": {
        "payloads": [
          {
            "metadata": {
              "encoding": "anNvbi9wbGFpbg=="
            },
            "data": "ImluaXRpYWwgdmVyc2lvbiI="
          }
        ]
      },
      "version": {
        "payloads": [
          {
            "metadata": {
              "encoding": "anNvbi9wbGFpbg=="
            },
            "data": "Mw=="
          }
        ]
      }
    },
    "workflowTaskCompletedEventId": "4",
    "header": null,
    "failure": null
  },
  "eventList": [
    {
      "eventId": "5",
      "eventTime": "2022-07-01T20:28:48.820951669Z",
      "eventType": "MarkerRecorded",
      "version": "0",
      "taskId": "29887307",
      "markerRecordedEventAttributes": {
        "markerName": "Version",
        "details": {
          "change-id": {
            "payloads": [
              {
                "metadata": {
                  "encoding": "anNvbi9wbGFpbg=="
                },
                "data": "ImluaXRpYWwgdmVyc2lvbiI="
              }
            ]
          },
          "version": {
            "payloads": [
              {
                "metadata": {
                  "encoding": "anNvbi9wbGFpbg=="
                },
                "data": "Mw=="
              }
            ]
          }
        },
        "workflowTaskCompletedEventId": "4",
        "header": null,
        "failure": null
      },
      "attributes": {
        "type": "markerRecordedEventAttributes",
        "markerName": "Version",
        "details": {
          "change-id": {
            "payloads": [
              {
                "metadata": {
                  "encoding": "anNvbi9wbGFpbg=="
                },
                "data": "ImluaXRpYWwgdmVyc2lvbiI="
              }
            ]
          },
          "version": {
            "payloads": [
              {
                "metadata": {
                  "encoding": "anNvbi9wbGFpbg=="
                },
                "data": "Mw=="
              }
            ]
          }
        },
        "workflowTaskCompletedEventId": "4",
        "header": null,
        "failure": null
      },
      "category": "marker",
      "id": "5",
      "name": "MarkerRecorded",
      "timestamp": "2022-07-01 UTC 20:28:48.82"
    }
  ],
  "lastEvent": {
    "eventId": "5",
    "eventTime": "2022-07-01T20:28:48.820951669Z",
    "eventType": "MarkerRecorded",
    "version": "0",
    "taskId": "29887307",
    "markerRecordedEventAttributes": {
      "markerName": "Version",
      "details": {
        "change-id": {
          "payloads": [
            {
              "metadata": {
                "encoding": "anNvbi9wbGFpbg=="
              },
              "data": "ImluaXRpYWwgdmVyc2lvbiI="
            }
          ]
        },
        "version": {
          "payloads": [
            {
              "metadata": {
                "encoding": "anNvbi9wbGFpbg=="
              },
              "data": "Mw=="
            }
          ]
        }
      },
      "workflowTaskCompletedEventId": "4",
      "header": null,
      "failure": null
    },
    "attributes": {
      "type": "markerRecordedEventAttributes",
      "markerName": "Version",
      "details": {
        "change-id": {
          "payloads": [
            {
              "metadata": {
                "encoding": "anNvbi9wbGFpbg=="
              },
              "data": "ImluaXRpYWwgdmVyc2lvbiI="
            }
          ]
        },
        "version": {
          "payloads": [
            {
              "metadata": {
                "encoding": "anNvbi9wbGFpbg=="
              },
              "data": "Mw=="
            }
          ]
        }
      },
      "workflowTaskCompletedEventId": "4",
      "header": null,
      "failure": null
    },
    "category": "marker",
    "id": "5",
    "name": "MarkerRecorded",
    "timestamp": "2022-07-01 UTC 20:28:48.82"
  },
  "isFailureOrTimedOut": false,
  "isCanceled": false,
  "isTerminated": false
}
```

بصراحة، لا أتوقع منك استيعابه. أريد فقط أن تدرك أنه كبير. في تطبيقنا، نأخذ تلك البيانات الخام ونعيد تشكيلها إلى بنية بيانات أكثر قابلية للإدارة قليلًا، لكنها لا تزال معقدة.

[المطابقات غير المتماثلة](https://stevekinney.com/courses/testing/asymmetric-matchers) تتيح لي وضع بعض الافتراضات الخفيفة التي تُبقي اختباراتي مركّزة على ما ينبغي أن تختبره بالضبط. وإن تغيّر جزء آخر من بنية البيانات، فلا يهمني كثيرًا.
