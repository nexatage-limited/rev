# app/services/matching_service.py
import math
from typing import List, Tuple
from sqlalchemy.orm import Session
from ..database import TechnicianProfile

class MatchingService:
    
    @staticmethod
    def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculate distance between two points using Haversine formula (in km)"""
        R = 6371  # Earth's radius in km
        
        lat1_rad = math.radians(lat1)
        lon1_rad = math.radians(lon1)
        lat2_rad = math.radians(lat2)
        lon2_rad = math.radians(lon2)
        
        dlat = lat2_rad - lat1_rad
        dlon = lon2_rad - lon1_rad
        
        a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        
        return R * c
    
    @staticmethod
    def find_matches(db: Session, job_lat: float, job_lon: float) -> List[TechnicianProfile]:
        """Find top 3 technicians using weighted scoring"""
        # Get all verified technicians with location data
        technicians = db.query(TechnicianProfile).filter(
            TechnicianProfile.is_verified == True,
            TechnicianProfile.location_lat.isnot(None),
            TechnicianProfile.location_long.isnot(None)
        ).all()
        
        scored_techs = []
        
        for tech in technicians:
            distance = MatchingService.haversine_distance(
                job_lat, job_lon, tech.location_lat, tech.location_long
            )
            
            # Filter by 10km radius
            if distance > 10:
                continue
            
            # Calculate scores
            rating_score = tech.rating / 5.0 if tech.rating > 0 else 0.0
            proximity_score = 1 - (distance / 10)
            
            # Weighted formula (excluding response time until implemented)
            total_score = (0.625 * rating_score) + (0.375 * proximity_score)
            
            scored_techs.append((tech, total_score))
        
        # Sort by score descending and return top 3
        scored_techs.sort(key=lambda x: x[1], reverse=True)
        return [tech for tech, score in scored_techs[:3]]