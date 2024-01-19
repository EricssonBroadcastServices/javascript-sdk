import React from "react";
import { useParams } from "react-router";
import ComponentSelector from "../components/ComponentSelector/ComponentSelector";
import { useResolvedParticipantPage } from "../../src/hooks/usePage";

export const ParticipantPage = () => {
  const { id } = useParams();
  const [components, isLoading] = useResolvedParticipantPage(decodeURIComponent(id as string));
  if (isLoading || !components) return null;
  return (
    <div>
      {components.map((p, i) => (
        <ComponentSelector {...p} key={p.component.id + i} />
      ))}
    </div>
  );
};
