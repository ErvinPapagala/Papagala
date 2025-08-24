import { TrainingPlan } from '@/lib/types';

export default function TrainingCard({ plan }: { plan: TrainingPlan }) {
  return (
    <div className="card">
      <h3 className="card-title">{plan.title}</h3>
      <p>{plan.description}</p>
      <div className="price">€{plan.price_eur}</div>
    </div>
  );
}

