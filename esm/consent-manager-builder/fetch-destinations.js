var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this
        }),
      g
    )
    function verb(n) {
      return function(v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
import fetch from 'isomorphic-fetch'
import flatten from 'lodash/flatten'
import sortedUniqBy from 'lodash/sortedUniqBy'
import sortBy from 'lodash/sortBy'
function fetchDestinationForWriteKey(cdnHost, writeKey) {
  return __awaiter(this, void 0, void 0, function() {
    var res, destinations, _i, destinations_1, destination
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            fetch('https://'.concat(cdnHost, '/v1/projects/').concat(writeKey, '/integrations'))
          ]
        case 1:
          res = _a.sent()
          if (!res.ok) {
            throw new Error(
              'Failed to fetch integrations for write key '
                .concat(writeKey, ': HTTP ')
                .concat(res.status, ' ')
                .concat(res.statusText)
            )
          }
          return [
            4 /*yield*/,
            res.json()
            // Rename creationName to id to abstract the weird data model
          ]
        case 2:
          destinations = _a.sent()
          // Rename creationName to id to abstract the weird data model
          for (_i = 0, destinations_1 = destinations; _i < destinations_1.length; _i++) {
            destination = destinations_1[_i]
            // Because of the legacy Fullstory integration the creationName for this integration is the `name`
            if (destination.name === 'Fullstory') {
              destination.id = destination.name
            } else {
              destination.id = destination.creationName
            }
            delete destination.creationName
          }
          return [2 /*return*/, destinations]
      }
    })
  })
}
export default function fetchDestinations(cdnHost, writeKeys) {
  return __awaiter(this, void 0, void 0, function() {
    var destinationsRequests, _i, writeKeys_1, writeKey, destinations, _a
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          destinationsRequests = []
          for (_i = 0, writeKeys_1 = writeKeys; _i < writeKeys_1.length; _i++) {
            writeKey = writeKeys_1[_i]
            destinationsRequests.push(fetchDestinationForWriteKey(cdnHost, writeKey))
          }
          _a = flatten
          return [4 /*yield*/, Promise.all(destinationsRequests)]
        case 1:
          destinations = _a.apply(void 0, [_b.sent()])
          // Remove the dummy Repeater destination
          destinations = destinations.filter(function(d) {
            return d.id !== 'Repeater'
          })
          destinations = sortBy(destinations, ['id'])
          destinations = sortedUniqBy(destinations, 'id')
          return [2 /*return*/, destinations]
      }
    })
  })
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2gtZGVzdGluYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnNlbnQtbWFuYWdlci1idWlsZGVyL2ZldGNoLWRlc3RpbmF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxrQkFBa0IsQ0FBQTtBQUNwQyxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQTtBQUNwQyxPQUFPLFlBQVksTUFBTSxxQkFBcUIsQ0FBQTtBQUM5QyxPQUFPLE1BQU0sTUFBTSxlQUFlLENBQUE7QUFHbEMsU0FBZSwyQkFBMkIsQ0FDeEMsT0FBZSxFQUNmLFFBQWdCOzs7Ozt3QkFFSixxQkFBTSxLQUFLLENBQUMsa0JBQVcsT0FBTywwQkFBZ0IsUUFBUSxrQkFBZSxDQUFDLEVBQUE7O29CQUE1RSxHQUFHLEdBQUcsU0FBc0U7b0JBRWxGLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO3dCQUNYLE1BQU0sSUFBSSxLQUFLLENBQ2IscURBQThDLFFBQVEsb0JBQVUsR0FBRyxDQUFDLE1BQU0sY0FBSSxHQUFHLENBQUMsVUFBVSxDQUFFLENBQy9GLENBQUE7cUJBQ0Y7b0JBRW9CLHFCQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUU7d0JBRXJDLDZEQUE2RDtzQkFGeEI7O29CQUEvQixZQUFZLEdBQUcsU0FBZ0I7b0JBRXJDLDZEQUE2RDtvQkFDN0QsV0FBc0MsRUFBWiw2QkFBWSxFQUFaLDBCQUFZLEVBQVosSUFBWSxFQUFFO3dCQUE3QixXQUFXO3dCQUNwQixrR0FBa0c7d0JBQ2xHLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7NEJBQ3BDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQTt5QkFDbEM7NkJBQU07NEJBQ0wsV0FBVyxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFBO3lCQUMxQzt3QkFDRCxPQUFPLFdBQVcsQ0FBQyxZQUFZLENBQUE7cUJBQ2hDO29CQUVELHNCQUFPLFlBQVksRUFBQTs7OztDQUNwQjtBQUVELE1BQU0sQ0FBQyxPQUFPLFVBQWdCLGlCQUFpQixDQUM3QyxPQUFlLEVBQ2YsU0FBbUI7Ozs7OztvQkFFYixvQkFBb0IsR0FBNkIsRUFBRSxDQUFBO29CQUN6RCxXQUFnQyxFQUFULHVCQUFTLEVBQVQsdUJBQVMsRUFBVCxJQUFTLEVBQUU7d0JBQXZCLFFBQVE7d0JBQ2pCLG9CQUFvQixDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtxQkFDMUU7b0JBRWtCLEtBQUEsT0FBTyxDQUFBO29CQUFDLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7b0JBQTlELFlBQVksR0FBRyxrQkFBUSxTQUF1QyxFQUFDO29CQUNuRSx3Q0FBd0M7b0JBQ3hDLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQW5CLENBQW1CLENBQUMsQ0FBQTtvQkFDNUQsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO29CQUMzQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQTtvQkFDL0Msc0JBQU8sWUFBWSxFQUFBOzs7O0NBQ3BCIn0=
