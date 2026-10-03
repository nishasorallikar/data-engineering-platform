import { InteractivePipeline } from './interactive-pipeline/InteractivePipeline';
import { InteractiveETLELT } from './interactive-etl-elt/InteractiveETLELT';
import { InteractiveOLTPOLAP } from './interactive-oltp-olap/InteractiveOLTPOLAP';
import { InteractiveLakeWarehouse } from './interactive-lake-warehouse/InteractiveLakeWarehouse';
import { InteractiveDataShape } from './interactive-data-types/InteractiveDataShape';
import { InteractiveDataMart } from './interactive-data-mart/InteractiveDataMart';
import { InteractiveBatchStream } from './interactive-batch-stream/InteractiveBatchStream';
import { InteractiveJoinTypes } from './interactive-join-types/InteractiveJoinTypes';
import { InteractiveWhereVsHaving } from './interactive-where-having/InteractiveWhereVsHaving';
import { InteractiveWindowFunctions } from './interactive-window-functions/InteractiveWindowFunctions';
import { InteractiveSecondHighest } from './interactive-second-highest/InteractiveSecondHighest';
import { InteractiveDuplicates } from './interactive-duplicates/InteractiveDuplicates';
import { InteractiveSubqueryCTE } from './interactive-subquery-cte/InteractiveSubqueryCTE';
import { InteractiveQueryPlan } from './interactive-query-plan/InteractiveQueryPlan';
import { InteractiveUnion } from './interactive-union/InteractiveUnion';
import { InteractiveNulls } from './interactive-nulls/InteractiveNulls';
import { InteractiveNormalization } from './interactive-normalization/InteractiveNormalization';
import { InteractiveDenormalization } from './interactive-denormalization/InteractiveDenormalization';
import { InteractiveStarSchema } from './interactive-star-schema/InteractiveStarSchema';
import { InteractiveSnowflakeSchema } from './interactive-snowflake-schema/InteractiveSnowflakeSchema';
import { InteractiveFactTypes } from './interactive-fact-types/InteractiveFactTypes';
import { InteractiveSurrogateKeys } from './interactive-surrogate-keys/InteractiveSurrogateKeys';
import { InteractiveSCD } from './interactive-scd/InteractiveSCD';
import { InteractiveGrain } from './interactive-grain/InteractiveGrain';
import { InteractiveDataVault } from './interactive-data-vault/InteractiveDataVault';
import { InteractiveIdempotency } from './interactive-idempotency/InteractiveIdempotency';
import { InteractiveLoadTypes } from './interactive-load-types/InteractiveLoadTypes';
import { InteractiveCDC } from './interactive-cdc/InteractiveCDC';
import { InteractiveBackfill } from './interactive-backfill/InteractiveBackfill';
import { InteractiveDAG } from './interactive-dag/InteractiveDAG';
import { InteractiveLateData } from './interactive-late-data/InteractiveLateData';
import { InteractiveDataQuality } from './interactive-data-quality/InteractiveDataQuality';
import { InteractiveSchemaDrift } from './interactive-schema-drift/InteractiveSchemaDrift';
import { InteractiveIncident } from './interactive-incident/InteractiveIncident';
import { InteractiveSparkArchitecture } from './interactive-spark-architecture/InteractiveSparkArchitecture';
import { InteractiveRDD } from './interactive-rdd/InteractiveRDD';
import { InteractiveLazyEval } from './interactive-lazy-eval/InteractiveLazyEval';
import { InteractiveShuffle } from './interactive-shuffle/InteractiveShuffle';
import { InteractiveDataSkew } from './interactive-data-skew/InteractiveDataSkew';
import { InteractivePartitioning } from './interactive-partitioning/InteractivePartitioning';
import { InteractiveFileFormats } from './interactive-file-formats/InteractiveFileFormats';
import { InteractiveSmallFiles } from './interactive-small-files/InteractiveSmallFiles';
import { InteractiveCache } from './interactive-cache/InteractiveCache';
import { InteractiveKafkaArch } from './interactive-kafka-arch/InteractiveKafkaArch';
import { InteractiveKafkaVsMQ } from './interactive-kafka-vs-mq/InteractiveKafkaVsMQ';
import { InteractiveDeliverySemantics } from './interactive-delivery-semantics/InteractiveDeliverySemantics';
import { InteractiveWatermarks } from './interactive-watermarks/InteractiveWatermarks';
import { InteractiveCAPTheorem } from './interactive-cap-theorem/InteractiveCAPTheorem';
import { InteractiveScaling } from './interactive-scaling/InteractiveScaling';
import { InteractiveRideHailing } from './interactive-ride-hailing/InteractiveRideHailing';
import { QuestionDto } from '@/lib/dto/questionDto';

export type FundamentalInteractionType =
  | 'pipeline'
  | 'comparison'
  | 'comparison-lab'
  | 'architecture-explorer'
  | 'data-types'
  | 'data-mart'
  | 'batch-stream'
  | 'join-types'
  | 'where-having'
  | 'window-functions'
  | 'second-highest'
  | 'duplicates'
  | 'subquery-cte'
  | 'query-plan'
  | 'union'
  | 'nulls'
  | 'normalization'
  | 'denormalization'
  | 'star-schema'
  | 'snowflake-schema'
  | 'fact-types'
  | 'surrogate-keys'
  | 'scd'
  | 'grain'
  | 'data-vault'
  | 'idempotency'
  | 'load-types'
  | 'cdc'
  | 'backfill'
  | 'dag'
  | 'late-data'
  | 'data-quality'
  | 'schema-drift'
  | 'incident'
  | 'spark-architecture'
  | 'rdd'
  | 'lazy-eval'
  | 'shuffle'
  | 'data-skew'
  | 'partitioning'
  | 'file-formats'
  | 'small-files'
  | 'cache'
  | 'kafka-arch'
  | 'kafka-vs-mq'
  | 'delivery-semantics'
  | 'watermarks'
  | 'cap-theorem'
  | 'scaling'
  | 'ride-hailing'
  | 'architecture'
  | 'flow'
  | 'hierarchy'
  | 'matrix'
  | 'table'
  | 'timeline'
  | 'state-machine'
  | 'execution'
  | 'stream'
  | 'system-design'
  | 'none';

export const QUESTION_INTERACTION_MAP: Record<string, FundamentalInteractionType> = {
  'fundamental-q1': 'pipeline',
  'fundamental-q2': 'comparison',
  'fundamental-q3': 'comparison-lab',
  'fundamental-q4': 'architecture-explorer',
  'fundamental-q5': 'data-types',
  'fundamental-q6': 'data-mart',
  'fundamental-q7': 'batch-stream',
  'fundamental-q8': 'join-types',
  'fundamental-q9': 'where-having',
  'fundamental-q10': 'window-functions',
  'fundamental-q11': 'second-highest',
  'fundamental-q12': 'duplicates',
  'fundamental-q13': 'subquery-cte',
  'fundamental-q14': 'query-plan',
  'fundamental-q15': 'union',
  'fundamental-q16': 'nulls',
  'fundamental-q17': 'normalization',
  'fundamental-q18': 'denormalization',
  'fundamental-q19': 'star-schema',
  'fundamental-q20': 'snowflake-schema',
  'fundamental-q21': 'fact-types',
  'fundamental-q22': 'surrogate-keys',
  'fundamental-q23': 'scd',
  'fundamental-q24': 'grain',
  'fundamental-q25': 'data-vault',
  'fundamental-q26': 'idempotency',
  'fundamental-q27': 'load-types',
  'fundamental-q28': 'cdc',
  'fundamental-q29': 'backfill',
  'fundamental-q30': 'dag',
  'fundamental-q31': 'late-data',
  'fundamental-q32': 'data-quality',
  'fundamental-q33': 'schema-drift',
  'fundamental-q34': 'incident',
  'fundamental-q35': 'spark-architecture',
  'fundamental-q36': 'rdd',
  'fundamental-q37': 'lazy-eval',
  'fundamental-q38': 'shuffle',
  'fundamental-q39': 'data-skew',
  'fundamental-q40': 'partitioning',
  'fundamental-q41': 'file-formats',
  'fundamental-q42': 'small-files',
  'fundamental-q43': 'cache',
  'fundamental-q44': 'kafka-arch',
  'fundamental-q45': 'kafka-vs-mq',
  'fundamental-q46': 'delivery-semantics',
  'fundamental-q47': 'watermarks',
  'fundamental-q48': 'cap-theorem',
  'fundamental-q49': 'scaling',
  'fundamental-q50': 'ride-hailing',
};

interface InteractionRegistryProps {
  q: QuestionDto;
}

export function InteractionRegistry({ q }: InteractionRegistryProps) {
  const interactionType = QUESTION_INTERACTION_MAP[q.id] || 'none';

  switch (interactionType) {
    case 'pipeline':
      return <InteractivePipeline />;
    case 'comparison':
      if (q.id === 'fundamental-q2') {
        return <InteractiveETLELT />;
      }
      return null;
    case 'comparison-lab':
      if (q.id === 'fundamental-q3') {
        return <InteractiveOLTPOLAP />;
      }
      return null;
    case 'architecture-explorer':
      if (q.id === 'fundamental-q4') {
        return <InteractiveLakeWarehouse />;
      }
      return null;
    case 'data-types':
      return <InteractiveDataShape />;
    case 'data-mart':
      return <InteractiveDataMart />;
    case 'batch-stream':
      return <InteractiveBatchStream />;
    case 'join-types':
      return <InteractiveJoinTypes />;
    case 'where-having':
      return <InteractiveWhereVsHaving />;
    case 'window-functions':
      return <InteractiveWindowFunctions />;
    case 'second-highest':
      return <InteractiveSecondHighest />;
    case 'duplicates':
      return <InteractiveDuplicates />;
    case 'subquery-cte':
      return <InteractiveSubqueryCTE />;
    case 'query-plan':
      return <InteractiveQueryPlan />;
    case 'union':
      return <InteractiveUnion />;
    case 'nulls':
      return <InteractiveNulls />;
    case 'normalization':
      return <InteractiveNormalization />;
    case 'denormalization':
      return <InteractiveDenormalization />;
    case 'star-schema':
      return <InteractiveStarSchema />;
    case 'snowflake-schema':
      return <InteractiveSnowflakeSchema />;
    case 'fact-types':
      return <InteractiveFactTypes />;
    case 'surrogate-keys':
      return <InteractiveSurrogateKeys />;
    case 'scd':
      return <InteractiveSCD />;
    case 'grain':
      return <InteractiveGrain />;
    case 'data-vault':
      return <InteractiveDataVault />;
    case 'idempotency':
      return <InteractiveIdempotency />;
    case 'load-types':
      return <InteractiveLoadTypes />;
    case 'cdc':
      return <InteractiveCDC />;
    case 'backfill':
      return <InteractiveBackfill />;
    case 'dag':
      return <InteractiveDAG />;
    case 'late-data':
      return <InteractiveLateData />;
    case 'data-quality':
      return <InteractiveDataQuality />;
    case 'schema-drift':
      return <InteractiveSchemaDrift />;
    case 'incident':
      return <InteractiveIncident />;
    case 'spark-architecture':
      return <InteractiveSparkArchitecture />;
    case 'rdd':
      return <InteractiveRDD />;
    case 'lazy-eval':
      return <InteractiveLazyEval />;
    case 'shuffle':
      return <InteractiveShuffle />;
    case 'data-skew':
      return <InteractiveDataSkew />;
    case 'partitioning':
      return <InteractivePartitioning />;
    case 'file-formats':
      return <InteractiveFileFormats />;
    case 'small-files':
      return <InteractiveSmallFiles />;
    case 'cache':
      return <InteractiveCache />;
    case 'kafka-arch':
      return <InteractiveKafkaArch />;
    case 'kafka-vs-mq':
      return <InteractiveKafkaVsMQ />;
    case 'delivery-semantics':
      return <InteractiveDeliverySemantics />;
    case 'watermarks':
      return <InteractiveWatermarks />;
    case 'cap-theorem':
      return <InteractiveCAPTheorem />;
    case 'scaling':
      return <InteractiveScaling />;
    case 'ride-hailing':
      return <InteractiveRideHailing />;
    case 'none':
    default:
      return null; // Fallback if no interactive visual is defined yet
  }
}
